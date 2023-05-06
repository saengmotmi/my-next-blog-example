import { unstable_serialize } from "swr";
import type { GetStaticPropsContext } from "next/types";
import { isString } from "lodash-es";

import PostDetailView from "components/views/PostDetail";
import { getPostByFilename, getPostFilenames } from "services/posts";
import { markdownToHtml } from "utils/markdown";

const Detail = () => {
  return <PostDetailView />;
};

export default Detail;

export async function getStaticPaths() {
  const filenames = await getPostFilenames();
  const getFilename = (slug: string) => "/" + slug.split(".")[0];

  return {
    paths: filenames.map(getFilename),
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
