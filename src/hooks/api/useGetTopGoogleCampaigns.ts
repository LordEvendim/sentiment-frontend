import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

import { TopMetaCampaign } from "./types/campaigns";

const fetchTopGoogleCampaigns = async (timeframe: DashboardTimeframe) => {
  const result = await axiosMainServer.get<TopMetaCampaign[]>(
    "/google/campaigns/top",
    {
      params: {
        since: calculateTimeframeStart(
          new Date(Date.now()),
          timeframe
        ).getTime(),
      },
    }
  );

  return result.data;
};

export const useGetTopGoogleCampaigns = (timeframe: DashboardTimeframe) => {
  const { data, isFetching } = useQuery({
    staleTime: 0,
    queryKey: [QueryKey.TopGoogleCampaigns, timeframe],
    queryFn: () => fetchTopGoogleCampaigns(timeframe),
    retry: 0,
  });

  return {
    campaigns: data,
    isFetching,
  };
};
