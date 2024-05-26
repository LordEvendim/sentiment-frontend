import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { UserSession } from "./types/session";

const fetchSession = async () => {
  const result = await axiosMainServer.get<UserSession | undefined>("/auth/");

  return result.data;
};

export const useSession = () => {
  const { data, isFetching } = useQuery({
    staleTime: 60 * 60 * 1000, // 1 hour
    queryKey: [QueryKey.Session],
    queryFn: () => fetchSession(),
    retry: 0,
  });

  return {
    userData: data,
    isFetching,
  };
};
