"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { InfiniteData } from "@tanstack/react-query";
export default function PostRecommends() {
  const { data } = useInfiniteQuery<IPost[], unknown, InfiniteData<IPost[]>, [string, string], number>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });

  //   console.log("data:", data);

  if (!data) {
    return null;
  }

  // return data.map((post) => <Post key={post.postId} post={post} />);
  return (
    <>
      {data.pages.flat().map((post: IPost) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
}
