import Link from "next/link";

import { useGetPosts } from "./hooks";

export default function Posts() {
  const { posts } = useGetPosts();

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
