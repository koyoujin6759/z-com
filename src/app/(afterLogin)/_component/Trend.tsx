import Link from "next/link";
import style from "./trend.module.css";
import { HashTag } from "@/model/HashTag";

type Props = {
  trend: HashTag;
};

export default function Trend({ trend }: Props) {
  return (
    <Link href={`/search?q=${trend.title}`} className={style.container}>
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
