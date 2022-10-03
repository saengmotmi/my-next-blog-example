import type { NextPage } from "next";

import PostsView from "components/views/Posts";
import { getAllPosts } from "services/posts";
import { markdownToHtml } from "utils/markdown";
import type { Post } from "types";

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return <PostsView posts={posts} />;
};

export default Home;

export async function getStaticProps() {
  const posts = getAllPosts(["content", "data"]);
  const convertedPosts = await Promise.all(
    posts.map(async (post) => {
      return {
        ...post,
        content: await markdownToHtml(post.content),
      };
    })
  );

  return {
    props: {
      posts: convertedPosts,
    },
  };
}
