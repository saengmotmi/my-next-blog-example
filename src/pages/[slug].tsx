import PostDetailView from "components/views/PostDetail";
import { getPostByFilename, getPostFilenames } from "services/posts";
import type { GetStaticPropsContext } from "next/types";
import { markdownToHtml } from "utils/markdown";
import type { Post } from "types";

interface Props {
  post: Post;
}

const Detail = ({ post }: Props) => {
  return <PostDetailView post={post} />;
};

export default Detail;

export async function getStaticPaths() {
  const filenames = await getPostFilenames();

  return {
    paths: filenames.map((slug) => "/" + slug.split(".")[0]),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params || {};

  if (!slug) {
    return {
      props: {},
    };
  }

  const post = await getPostByFilename(slug as string, ["content", "data"]);

  return {
    props: {
      post: { ...post, content: await markdownToHtml(post.content) },
    },
  };
}
