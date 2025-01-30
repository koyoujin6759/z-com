"use client";

import style from "./followRecommend.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function FollowRecommend() {
  const session = useSession();
  const onFollow = () => {
    if (!session?.data?.user) {
      redirect("/login");
    }
  };

  const user = {
    id: "elonmusk",
    nickname: "Elon Musk",
    image: "/yRsRRjGO.jpg",
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <Image src={user.image} alt={user.id} width={40} height={40} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
}
