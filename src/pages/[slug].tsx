import { unstable_serialize } from "swr";
import type { GetStaticPropsContext } from "next/types";
import { isString } from "lodash-es";

import PostDetailView from "components/views/PostDetail";
import { getPostByFilename, getMarkdownFilenames } from "services/posts";
import { markdownToHtml } from "features/markdown/markdown";

const Detail = () => {
  return <PostDetailView />;
};

export default Detail;

export async function getStaticPaths() {
  const markdowns = await getMarkdownFilenames();

  return {
    paths: markdowns.map(function getFilePath(slug: string) {
      return `/${slug}`;
    }),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params || {};

  if (!isString(slug)) {
    return {
      props: {},
    };
  }

  const post = await getPostByFilename(slug, ["content", "data"]);
  const convertedPost = {
    ...post,
    content: await markdownToHtml(post.content),
  };

  return {
    props: {
      fallback: {
        [unstable_serialize(["posts", slug])]: JSON.stringify(convertedPost),
      },
    },
  };
}
