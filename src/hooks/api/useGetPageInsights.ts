import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

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
  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    enabled: Boolean(pageId) && Boolean(userId) && false,
    queryKey: [QueryKey.PageInsights, pageId],
    queryFn: () => fetchPageInsights(userId!.toString(), pageId!),
  });

  return {
    insights: data,
    isFetching,
  };
};
