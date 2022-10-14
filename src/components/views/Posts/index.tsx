import Link from "next/link";

import type { Post } from "types";
import useSWR from "swr";

export default function Posts() {
  const { data: posts } = useSWR<Post[]>(["posts"]);

  return (
    <div className="markdown-body">
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
