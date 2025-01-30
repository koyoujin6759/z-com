"use client";

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, //탭이동 시 데이터 재요청 안함
          retryOnMount: true, //서버 재시작 시 데이터 재요청
          refetchOnReconnect: false, //네트워크 재연결 시 데이터 재요청 안함
          retry: false, //데이터 요청 실패 시 재요청 안함
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"} />
    </QueryClientProvider>
  );
}

export default RQProvider;
