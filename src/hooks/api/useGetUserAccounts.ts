import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { useSession } from "./auth/useSession";
import { GetMetaAccounts } from "./types/accounts";

const fetchUserAccounts = async () => {
  const result = await axiosMainServer.get<GetMetaAccounts>("/meta/accounts");

  return result.data;
};

export const useGetUserMetaAccounts = (isEnabled: boolean) => {
  const { userData } = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 1000,
    enabled: isEnabled && Boolean(userData?.id),
    queryKey: [QueryKey.Accounts],
    queryFn: () => fetchUserAccounts(),
  });

  return {
    accounts: data,
    isFetching,
  };
};
