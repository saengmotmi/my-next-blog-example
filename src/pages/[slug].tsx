import { unstable_serialize } from "swr";
import type { GetStaticPropsContext } from "next/types";
import { isString } from "lodash-es";

import PostDetailView from "components/views/PostDetail";
import { getPostByFilename, getPostFilenames } from "services/posts";
import { markdownToHtml } from "features/markdown/markdown";
import { getFilenameWithoutExtension } from "utils/file";

const Detail = () => {
  return <PostDetailView />;
};

export default Detail;

export async function getStaticPaths() {
  const filenames = await getPostFilenames();

  return {
    paths: filenames.map(function getFilename(slug: string) {
      return `/${getFilenameWithoutExtension(slug)}`;
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
