import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { useFacebook } from "#stores/useFacebook";

import { GetAccounts } from "./types/accounts";

const fetchUserAccounts = async (userId: string) => {
  const result = await axiosMainServer.get<GetAccounts>("/meta/accounts", {
    params: {
      userId,
    },
  });

  return result.data;
};

export const useGetUserAccounts = (
  userId: number | undefined,
  isEnabled: boolean
) => {
  const isLogged = useFacebook((state) => state.isLogged);

  const { data, isFetching } = useQuery({
    staleTime: 1000,
    enabled: isLogged && isEnabled && Boolean(userId),
    queryKey: [QueryKey.Accounts, userId],
    queryFn: () => fetchUserAccounts(userId!.toString()),
  });

  return {
    accounts: data,
    isFetching,
  };
};
