export type ReportMetricSource =
  | "meta-insights"
  | "meta-ads"
  | "google-analytics"
  | "google-ads";

export type ReportData = {
  metricId: string;
  value: number;
  source: ReportMetricSource;
}[];
