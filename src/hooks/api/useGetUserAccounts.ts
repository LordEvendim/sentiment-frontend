import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { GetAccounts } from "./types/accounts";

const fetchUserPages = async (userId: string) => {
  const result = await axiosMainServer.get<GetAccounts>("/meta/accounts", {
    params: {
      userId,
    },
  });

  return result.data;
};

export const useGetUserMetaPages = (
  userId: number | undefined,
  isEnabled: boolean
) => {
  const { data, isFetching } = useQuery({
    staleTime: 1000,
    enabled: isEnabled && Boolean(userId),
    queryKey: [QueryKey.Accounts, userId],
    queryFn: () => fetchUserPages(userId!.toString()),
  });

  return {
    pages: data,
    isFetching,
  };
};
