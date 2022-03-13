import type { NextPage } from "next";
import { remark } from "remark";
import html from "remark-html";
import { getAllPosts } from "libs/posts";

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  console.log("result", result);
  return result.value;
}

interface Props {
  allPosts: any[];
}

const Home: NextPage<Props> = ({ allPosts }) => {
  console.log(allPosts);

  return (
    <div>
      {allPosts.map((post, idx) => (
        <div key={idx}>
          <div dangerouslySetInnerHTML={{ __html: post }} />
        </div>
      ))}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const allPosts = getAllPosts(["content"]);

  return {
    props: {
      allPosts: await Promise.all(
        allPosts.map((post) => markdownToHtml(post.content))
      ),
    },
  };
}
