import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { Dashboards } from "#types/dashboard";
import { ReportData } from "#types/report";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

import { useSession } from "./auth/useSession";

const fetchCompareData = async (timeframe: DashboardTimeframe) => {
  const result = await axiosMainServer.get<ReportData>(
    "/reporter/dashboard/general",
    {
      params: {
        since: format(
          calculateTimeframeStart(
            calculateTimeframeStart(new Date(Date.now()), timeframe),
            timeframe
          ).getTime(),
          "yyyyMMdd"
        ),
      },
    }
  );

  return result.data;
};

export const useGetGeneralDashboardCompareData = (
  timeframe: DashboardTimeframe
) => {
  const { userData } = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: Boolean(userData?.id),
    queryKey: [QueryKey.DashboardCompareData, Dashboards.General, timeframe],
    queryFn: () => fetchCompareData(timeframe),
  });

  return {
    data,
    isFetching,
  };
};
