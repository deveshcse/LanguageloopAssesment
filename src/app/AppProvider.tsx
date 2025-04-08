'use client';
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
 