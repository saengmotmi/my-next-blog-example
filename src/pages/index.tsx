import type { NextPage } from "next";
import { unstable_serialize } from "swr";

import PostsView from "components/views/Posts";
import { getAllPosts } from "services/posts";
import { markdownToHtml } from "features/markdown/markdown";

const Home: NextPage = () => {
  return <PostsView />;
};

export default Home;

export async function getStaticProps() {
  const posts = getAllPosts({ fields: ["content", "data"] });
  const postsWithContent = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      content: await markdownToHtml(post.content),
    }))
  );

  const convertedPosts = await Promise.all(
    posts.map(async (post) => ({ ...post, content: postsWithContent }))
  );

  return {
    props: {
      fallback: {
        [unstable_serialize(["posts"])]: JSON.stringify(convertedPosts),
      },
    },
  };
}
