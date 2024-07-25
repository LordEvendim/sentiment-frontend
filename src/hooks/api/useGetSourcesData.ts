import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

export type SourcesData = {
  created_at: string;
  source: string;
  sessions: number;
}[];

const fetch = async (timeframe: DashboardTimeframe) => {
  const result = await axiosMainServer.get<SourcesData>("/google/sources", {
    params: {
      since: format(
        calculateTimeframeStart(new Date(Date.now()), timeframe).getTime(),
        "yyyyMMdd"
      ),
    },
  });

  return result.data;
};

export const useGetSourcesData = (timeframe: DashboardTimeframe) => {
  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    queryKey: [QueryKey.Sources, timeframe],
    queryFn: () => fetch(timeframe),
    retry: 0,
  });

  return {
    sources: data,
    isFetching,
  };
};
