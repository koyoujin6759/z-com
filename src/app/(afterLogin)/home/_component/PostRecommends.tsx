"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, //1분동안 캐시 유지
    gcTime: 300 * 1000, //5분동안 캐시 유지
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  //   console.log("data:", data?.pages);

  if (!data) {
    return null;
  }

  // return data.map((post) => <Post key={post.postId} post={post} />);
  return (
    <>
      {data.pages.flat().map((post: IPost) => (
        <Post key={post.postId} post={post} />
      ))}
      <div ref={ref} style={{ height: 50 }}></div>
    </>
  );
}
