import fs from "fs";
import path from "path";
import matter from "gray-matter";

const MD_REGEX = /\.md$/;

const postsDirectory = path.join(process.cwd(), "_posts");

function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

// \. : 마침표를 사용하기 위해 이스케이프 문자 붙임
// $ : 문자열의 마지막을 표시하거나 멀타리인 플래그의 마지막을 알리기 위해 붙임

function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(MD_REGEX, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: any = {};

  fields.forEach((field) => {
    console.log("field", field);
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
