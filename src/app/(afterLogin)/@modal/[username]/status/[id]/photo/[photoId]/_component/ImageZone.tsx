"use client";

import style from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/photoModal.module.css";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import Image from "next/image";
type Props = {
  id: string;
};
export default function ImageZone({ id }: Props) {
  const { data: post, isLoading } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if (isLoading || !post?.Images[0]) {
    return null;
  }
  console.log("post", post);
  return (
    <div className={style.imageZone}>
      <Image src={post.Images[0].link} alt={post.content} fill style={{ objectFit: "contain" }} priority />
      <div className={style.image} style={{ backgroundImage: `url(${post.Images[0].link})` }} />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white post={post} />
        </div>
      </div>
    </div>
  );
}
