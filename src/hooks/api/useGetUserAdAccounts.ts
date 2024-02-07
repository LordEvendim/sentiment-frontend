import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { useFacebook } from "#stores/useFacebook";

const fetchUserAdAccounts = async (userId: string) => {
  const result = await axiosMainServer.get<{ name: string; id: string }[]>(
    "/meta/ad-accounts",
    {
      params: {
        userId,
      },
    }
  );

  return result.data;
};

export const useGetUserAdAccounts = (
  userId: string | undefined,
  isEnabled: boolean
) => {
  const isLogged = useFacebook((state) => state.isLogged);

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: isLogged && isEnabled && Boolean(userId),
    queryKey: [QueryKey.AdAccounts, userId],
    queryFn: () => fetchUserAdAccounts(userId!),
  });

  return {
    adAccounts: data,
    isFetching,
  };
};
