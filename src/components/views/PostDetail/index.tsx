import { useGetPost } from "hooks/posts";
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
