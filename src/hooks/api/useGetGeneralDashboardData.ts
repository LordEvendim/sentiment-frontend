import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { Dashboards } from "#types/dashboard";
import { ReportData } from "#types/report";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

import { useSession } from "./useSession";

const fetchGeneralDashboardData = async (timeframe: DashboardTimeframe) => {
  const result = await axiosMainServer.get<ReportData>(
    "/reporter/dashboard/general",
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

export const useGetGeneralDashboardData = (timeframe: DashboardTimeframe) => {
  const { userData } = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: Boolean(userData?.id),
    queryKey: [QueryKey.DashboardData, Dashboards.General, timeframe],
    queryFn: () => fetchGeneralDashboardData(timeframe),
  });

  return {
    data,
    isFetching,
  };
};
