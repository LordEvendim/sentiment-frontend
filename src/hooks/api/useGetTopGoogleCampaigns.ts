import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

import { TopGoogleCampaign } from "./types/campaigns";

const fetchTopGoogleCampaigns = async (timeframe: DashboardTimeframe) => {
  const result = await axiosMainServer.get<TopGoogleCampaign[]>(
    "/google/campaigns/top",
    {
      params: {
        since: format(
          calculateTimeframeStart(new Date(Date.now()), timeframe).getTime(),
          "yyyyMMdd"
        ),
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
