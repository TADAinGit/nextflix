"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false, // default: true
//     },
//   },
// });

const MainProvider = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // default: true
          staleTime: 5000,
        },
      },
    })
  );
  return (
    <>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </>
  );
};

export default MainProvider;
