const fs = require("fs-extra");
const matter = require("gray-matter");
const dayjs = require("dayjs");
const inquirer = require("inquirer");
const datePrompt = require("inquirer-date-prompt");
const log = require("signale");
const prompt = inquirer.createPromptModule();
prompt.registerPrompt("date", datePrompt);

// TODO: 태그 선택지 만들기
const getTags = () => {};

const refineMetaData = (rawData) =>
  matter.stringify("", rawData).split("'").join("");

const questions = [
  {
    type: "input",
    name: "title",
    message: "포스트 제목을 입력해주세요",
    validate: (title) => title.length > 0,
  },
  {
    type: "date",
    name: "timestamp",
    message: "포스트 작성 시각을 입력해주세요",
    locale: "ko-KR",
    format: { month: "short", hour: undefined, minute: undefined },
    filter: (d) => dayjs(d).format("YYYY-MM-DD"),
    default: new Date(),
    clearable: true,
  },
];

prompt(questions).then(async (res) => {
  const destDir = process.cwd();
  const contentsDir = destDir + "/_posts";

  const destDirExists = await fs.pathExists(contentsDir);
  const destContentExist = await fs.pathExists(
    `${contentsDir}/${res.title}.md`
  );

  const meta = refineMetaData({
    title: res.title,
    timestamp: res.timestamp,
    tags: [],
  });

  if (!destDirExists) {
    await fs.ensureDir(contentsDir);
  }

  if (destContentExist) {
    log.error(`${res.title}.md already exists.`);
    return;
  }

  fs.writeFile(`${contentsDir}/${res.title}.md`, meta, (err) => {
    if (err) {
      log.error("Unknown Error: Cannot write file!", err);
      return;
    }
    console.log("");

    log.success("Success to create new post!");
    log.note(`${contentsDir}/${res.title}.md\n${meta}`);
  });
});
