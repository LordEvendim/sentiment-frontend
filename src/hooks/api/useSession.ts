import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { UserData } from "./types/session";

const fetchSession = async () => {
  const result = await axiosMainServer.get<UserData | undefined>("/auth/");

  return result.data;
};

export const useSession = () => {
  const { data, isFetching } = useQuery({
    staleTime: 0,
    queryKey: [QueryKey.Session],
    queryFn: () => fetchSession(),
    retry: 0,
  });

  return {
    userData: data,
    isFetching,
  };
};
