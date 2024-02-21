import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { useFacebook } from "#stores/useFacebook";

import { PageInsights } from "./types/insights";

const fetchPageInsights = async (userId: string, pageId: string) => {
  const result = await axiosMainServer.get<PageInsights>(
    "/meta/page/insights",
    {
      params: {
        userId,
        pageId,
      },
    }
  );

  return result.data;
};

export const useGetPageInsights = (
  userId: number | undefined,
  pageId: string | undefined
) => {
  const isLogged = useFacebook((state) => state.isLogged);

  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    enabled: isLogged && Boolean(pageId) && Boolean(userId),
    queryKey: [QueryKey.PageInsights, pageId],
    queryFn: () => fetchPageInsights(userId!.toString(), pageId!),
  });

  return {
    insights: data,
    isFetching,
  };
};
