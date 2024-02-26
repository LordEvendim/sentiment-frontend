export type PageInsights = {
  metricId: string;
  name: string;
  period: "day" | "week" | "days_28";
  value: number;
  endTime: string;
  title: string;
  description: string;
}[];
