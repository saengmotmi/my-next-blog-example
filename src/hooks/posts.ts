import useSWR, { unstable_serialize, useSWRConfig } from "swr";

// export const useGetPosts = <T extends object>(queryKey: string[]): T => {
//   const client = useSWRConfig();
//   return client.fallback[unstable_serialize(queryKey)];
// };

export const useGetPosts = (queryKey: string[]) => {
  return useSWR([unstable_serialize(queryKey)]);
};
