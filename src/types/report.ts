export type ReportMetricSource =
  | "meta-insights"
  | "meta-ads"
  | "google-analytics"
  | "google-ads";

export type ReportData = (
  | {
      display: "metric";
      metricId: string;
      source: ReportMetricSource;
      value: number;
    }
  | {
      display: "chart";
      metricId: string;
      source: ReportMetricSource;
      values: [number, number][];
    }
)[];
