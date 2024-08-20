import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

import { GoogleAdGroupSummary } from "../types/adGroups";

const fetchGoogleAdGroups = async (timeframe: DashboardTimeframe) => {
  const result = await axiosMainServer.get<GoogleAdGroupSummary[]>(
    "/google/ad-groups",
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

export const useGetGoogleAdGroups = (timeframe: DashboardTimeframe) => {
  const { data, isFetching } = useQuery({
    staleTime: 0,
    queryKey: [QueryKey.AdGroups, timeframe],
    queryFn: () => fetchGoogleAdGroups(timeframe),
    retry: 0,
  });

  return {
    adGroups: data,
    isFetching,
  };
};
