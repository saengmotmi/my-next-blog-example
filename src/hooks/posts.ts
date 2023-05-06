import useSWR from "swr";
import type { Post } from "types";

export const useGetPosts = () => {
  const data = useSWR<string>(["posts"]);

  return {
    ...data,
    posts: JSON.parse(data.data || "[]") as Post[],
  };
};
