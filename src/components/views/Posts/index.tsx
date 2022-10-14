import Link from "next/link";

import { useGetPosts } from "hooks/posts";
import type { Post } from "types";

export default function Posts() {
  const posts = useGetPosts<Post[]>(["posts"]);

  return (
    <div>
      {posts?.map(({ data }, idx) => {
        return (
          <Link key={idx} href={"/" + data.slug} passHref>
            <div dangerouslySetInnerHTML={{ __html: data.title }} />
          </Link>
        );
      })}
    </div>
  );
}
