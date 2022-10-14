import { useRouter } from "next/router";

import { useGetPosts } from "hooks/posts";
import type { Post } from "types";

export default function PostDetail() {
  const { slug } = useRouter().query;
  const post = useGetPosts<Post>(["posts", slug as string]);

  return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
}
