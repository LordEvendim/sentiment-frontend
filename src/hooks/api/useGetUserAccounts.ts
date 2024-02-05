import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { useFacebook } from "#stores/useFacebook";

const fetchUserAccounts = async (userId: string) => {
  const result = await axiosMainServer.get<{ name: string; id: string }[]>(
    "/meta/accounts",
    {
      params: {
        userId,
      },
    }
  );

  return result.data;
};

export const useGetUserAccounts = (
  userId: string | undefined,
  isEnabled: boolean
) => {
  const isLogged = useFacebook((state) => state.isLogged);

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: isLogged && isEnabled && Boolean(userId),
    queryKey: [QueryKey.Accounts, userId],
    queryFn: () => fetchUserAccounts(userId!),
  });

  return {
    accounts: data,
    isFetching,
  };
};
