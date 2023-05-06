import useSWR from "swr";
import type { Post } from "types";

export const useGetPosts = () => {
  const data = useSWR<string>(["posts"]);

  return {
    ...data,
    posts: JSON.parse(data.data || "[]") as Post[],
  };
};

export const useGetPost = (slug: string) => {
  const data = useSWR<string>(["posts", slug]);

  return {
    ...data,
    post: JSON.parse(data.data || "[]") as Post,
  };
};
