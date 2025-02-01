"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";
import Trend from "@/app/(afterLogin)/_component/Trend";
import { HashTag } from "@/model/HashTag";

export default function TrendSection() {
  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  return data?.map((trend) => <Trend key={trend.title} trend={trend} />);
}
