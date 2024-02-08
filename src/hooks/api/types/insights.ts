export type PageInsights = {
  data: {
    name: "page_impressions";
    period: "day" | "week" | "days_28";
    values: {
      value: number;
      end_time: string;
    }[];
    title: string;
    description: string;
    id: string;
  }[];
};
