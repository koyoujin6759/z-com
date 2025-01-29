import { faker } from "@faker-js/faker";
import style from "./chatRoom.module.css";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Room() {
  const user = {
    id: "hero",
    nickname: "영웅",
    image: faker.image.avatar(),
  };

  const messages = [
    { roomId: 123, id: "zerohch0", content: "안녕하세요.", createdAt: new Date() },
    { roomId: 123, id: "hero", content: "안녕히가세요.", createdAt: new Date() },
  ];

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        <Image src={user.image} alt={user.id} width={40} height={40} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === "zerohch0") {
            return (
              <div className={cx(style.myMessage, style.message)} key={m.id}>
                <div className={cx(style.content, style.myContent)}>{m.content}</div>
                <div className={style.date}>{dayjs(m.createdAt).fromNow()}</div>
              </div>
            );
          }
          return (
            <div className={style.yourMessage} key={m.id}>
              <div className={cx(style.content, style.yourContent)}>{m.content}</div>
              <div className={style.date}>{dayjs(m.createdAt).fromNow()}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
