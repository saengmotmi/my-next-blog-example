import Link from "next/link";

import type { Post } from "types";

interface Props {
  posts: Post[];
}

export default function Posts({ posts }: Props) {
  console.log({ posts });
  return (
    <div>
      {posts.map((post, idx) => {
        const { content, data } = post;
        return (
          <Link key={idx} href={"/" + data.title} passHref>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Link>
        );
      })}
    </div>
  );
}
