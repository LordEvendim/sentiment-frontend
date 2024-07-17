import { ReportMetricSource } from "#types/report";

export interface ChartData {
  metricId: string;
  source: ReportMetricSource;
  since: string;
  data: [number, number][];
}
