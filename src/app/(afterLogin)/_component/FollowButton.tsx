"use client";

import style from "./FollowButton.module.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function FollowButton() {
  const session = useSession();

  const onClickFollow = async () => {
    if (!session?.data?.user) {
      redirect("/login");
    }
  };

  return (
    <button onClick={onClickFollow} className={style.followButton}>
      팔로우
    </button>
  );
}
