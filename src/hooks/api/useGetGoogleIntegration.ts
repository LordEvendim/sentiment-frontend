import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { useSession } from "./useSession";

const fetchGoogleIntegration = async () => {
  const result = await axiosMainServer.get<string>("/google/integration");

  return result.data;
};

export const useGetGoogleAuthUrl = () => {
  const { userData } = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: Boolean(userData?.id),
    queryKey: [QueryKey.GoogleIntegration],
    queryFn: () => fetchGoogleIntegration(),
  });

  return {
    url: data,
    isFetching,
  };
};
