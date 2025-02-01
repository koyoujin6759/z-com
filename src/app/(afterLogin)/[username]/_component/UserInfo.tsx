"use client";

import style from "../profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import FollowButton from "@/app/(afterLogin)/_component/FollowButton";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../_lib/getUser";
import { User } from "@/model/User";

import Image from "next/image";
type Props = {
  username: string;
};

export default function UserInfo({ username }: Props) {
  const { data: user, error } = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  console.log("error", error);

  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: "center",
            fontSize: 31,
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div style={{ height: 100, fontSize: 31, fontWeight: "bold", alignItems: "center", justifyContent: "center", display: "flex" }}>계정이 존재하지 않음</div>
        </div>
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <Image src={user.image} alt={user.id} width={100} height={100} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <FollowButton />
      </div>
    </>
  );
}
