"use client";

import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/sonner";

interface IProps {
  children: React.ReactNode;
}

export const Providers: FC<IProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ViewTransitions>{children}</ViewTransitions>
      <Toaster />
    </QueryClientProvider>
  );
};
