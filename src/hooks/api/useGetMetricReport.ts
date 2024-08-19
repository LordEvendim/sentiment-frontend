import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { USER_ROLES } from "#config/roles";
import { DashboardTimeframe } from "#utils/timeframes";

import { useSession } from "./auth/useSession";
import { Report } from "./types/report";

const fetchReport = async (name: string, timeframe: DashboardTimeframe) => {
  const until = format(new Date(Date.now()), "yyyyMMdd");

  const result = await axiosMainServer.get<Report | undefined>(
    "/reporter/metric",
    {
      params: {
        timeframe,
        name,
        until,
      },
    }
  );

  return result.data;
};

export const useGetMetricReport = (
  timeframe: DashboardTimeframe,
  name: string
) => {
  const session = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    enabled: session.userData && session.userData.role !== USER_ROLES.REVIEWER,
    queryKey: [QueryKey.MetricReport, name, timeframe],
    queryFn: () => fetchReport(name, timeframe),
    retry: 0,
  });

  return {
    report: data,
    isFetching,
  };
};
