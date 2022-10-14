import { useRouter } from "next/router";
import useSWR from "swr";

import type { Post } from "types";

export default function PostDetail() {
  const { slug } = useRouter().query;
  const { data: post } = useSWR<Post>(["posts", slug as string]);

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: post?.content ?? "" }}
    />
  );
}
