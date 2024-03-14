import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { GetGoogleAccounts } from "./types/accounts";
import { useGetGoogleIntegration } from "./useGetGoogleIntegration";

const fetchUserAccounts = async () => {
  const result =
    await axiosMainServer.get<GetGoogleAccounts>("/google/accounts");

  return result.data;
};

export const useGetUserGoogleAccounts = (isEnabled: boolean) => {
  const { googleIntegration } = useGetGoogleIntegration();

  const { data, isFetching } = useQuery({
    staleTime: 1000,
    enabled: isEnabled && Boolean(googleIntegration),
    queryKey: [QueryKey.GoogleAccounts],
    queryFn: () => fetchUserAccounts(),
  });

  return {
    accounts: data,
    isFetching,
  };
};
