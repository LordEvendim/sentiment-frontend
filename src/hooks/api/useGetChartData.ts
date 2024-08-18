import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { SelectedMetricDetails } from "#hooks/useOverviewDashboard";
import { ReportMetricSource } from "#types/report";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

type ChartData = {
  since: string;
  data: Partial<Record<ReportMetricSource, [number, string][]>>;
};

const fetchData = async (
  metrics: SelectedMetricDetails["metrics"],
  timeframe: DashboardTimeframe
) => {
  const since = format(
    calculateTimeframeStart(new Date(Date.now()), timeframe),
    "yyyyMMdd"
  );

  const result = await axiosMainServer.get<ChartData>("/reporter/chart", {
    params: {
      metrics: metrics,
      timeframe,
      since,
    },
  });

  return result.data;
};

export const useGetChartData = (
  metrics: SelectedMetricDetails["metrics"],
  timeframe: DashboardTimeframe
) => {
  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    queryKey: [QueryKey.ChartData, metrics, timeframe],
    queryFn: () => fetchData(metrics, timeframe),
    retry: 0,
  });

  return {
    data,
    isFetching,
  };
};
