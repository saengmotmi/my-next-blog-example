import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import { isEmpty } from "lodash-es";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getMarkdownFilenames() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

// \. : 마침표를 사용하기 위해 이스케이프 문자 붙임
// $ : 문자열의 마지막을 표시하거나 멀타리인 플래그의 마지막을 알리기 위해 붙임

export function getPostByFilename(filename: string, fields: string[] = []) {
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content }: GrayMatterFile<any> = matter(fileContents);

  const items: Record<string, any> = {};

  fields.forEach((field) => {
    // TODO: content랑 data가 뭔지 파악하기
    if (field === "content") {
      items[field] = content;
    }
    if (field === "data") {
      items[field] = data;
    }
    if (!isEmpty(data[field])) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts({ fields = [] }: { fields: string[] }) {
  const markdowns = getMarkdownFilenames();

  const sortedPosts = markdowns
    .map((filename) => getPostByFilename(filename, fields))
    .sort(내림차순_정렬);

  return sortedPosts;

  function 내림차순_정렬(
    post1: ReturnType<typeof getPostByFilename>,
    post2: ReturnType<typeof getPostByFilename>
  ) {
    return post1.date > post2.date ? -1 : 1;
  }
}
