import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { useSession } from "./auth/useSession";

const fetchCredits = async () => {
  const result = await axiosMainServer.get<{ value: number | undefined }>(
    "/user/credits"
  );

  return result.data;
};

export const useGetCredits = () => {
  const { userData } = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: Boolean(userData?.id),
    queryKey: [QueryKey.Credits],
    queryFn: () => fetchCredits(),
    retry: 0,
  });

  return {
    credits: data,
    isFetching,
  };
};
