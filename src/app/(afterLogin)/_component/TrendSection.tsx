"use client";

import styles from "./trendSection.module.css";
import Trend from "@/app/(afterLogin)/_component/Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TrendSection() {
  const { data: session } = useSession();

  const pathname = usePathname();
  if (pathname === "/explore") {
    return null;
  }

  if (session?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.trendBg}>
      <div className={styles.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
