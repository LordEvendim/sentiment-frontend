import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { ReportMetricSource } from "#types/report";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

import { ChartData } from "./types/chart";

const fetchData = async (
  metricId: string,
  source: ReportMetricSource,
  timeframe: DashboardTimeframe
) => {
  const since = format(
    calculateTimeframeStart(new Date(Date.now()), timeframe),
    "yyyyMMdd"
  );

  const result = await axiosMainServer.get<ChartData>("/reporter/chart", {
    params: {
      metricId,
      source,
      timeframe,
      since,
    },
  });

  return result.data;
};

export const useGetChartData = (
  timeframe: DashboardTimeframe,
  metricId: string,
  source: ReportMetricSource
) => {
  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    queryKey: [QueryKey.ChartData, metricId, source, timeframe],
    queryFn: () => fetchData(metricId, source, timeframe),
    retry: 0,
  });

  return {
    data,
    isFetching,
  };
};
