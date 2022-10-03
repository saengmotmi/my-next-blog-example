import type { Post } from "types";

interface Props {
  post: Post;
}

export default function PostDetail({ post }: Props) {
  return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
}
