import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { useFacebook } from "#stores/useFacebook";

const fetchLlat = async (userId: string, accessToken: string) => {
  const result = await axiosMainServer.get<string>("/auth/meta/llat", {
    params: {
      userId,
      accessToken,
    },
  });

  return result.data;
};

export const useGetLongLivedToken = (
  userId: string | undefined,
  accessToken: string | undefined
) => {
  const isLogged = useFacebook((state) => state.isLogged);

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: isLogged && Boolean(userId) && Boolean(accessToken),
    queryKey: [QueryKey.Llat, userId],
    queryFn: () => fetchLlat(userId!, accessToken!),
  });

  return {
    token: data,
    isFetching,
  };
};
