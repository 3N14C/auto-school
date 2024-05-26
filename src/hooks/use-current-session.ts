"use client";

import { getCurrentSession } from "@/actions/user/get-current-user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentSession = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["current-session"],
    queryFn: async () => {
      const { user } = await getCurrentSession();

      return user;
    },
  });

  return { user, isLoading };
};
