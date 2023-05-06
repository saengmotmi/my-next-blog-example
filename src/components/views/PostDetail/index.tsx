import { useGetPost } from "./hooks";
import { useRouter } from "next/router";

export default function PostDetail() {
  const { slug } = useRouter().query;
  const { post } = useGetPost(slug as string);

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
    />
  );
}
