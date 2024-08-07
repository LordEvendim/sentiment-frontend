import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { DashboardTimeframe } from "#utils/timeframes";

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
  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    queryKey: [QueryKey.MetricReport, name, timeframe],
    queryFn: () => fetchReport(name, timeframe),
    retry: 0,
  });

  return {
    report: data,
    isFetching,
  };
};
