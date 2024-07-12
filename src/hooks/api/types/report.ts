import { DashboardTimeframe } from "#utils/timeframes";

export type Report = {
  data: string;
  reportId: number;
  createdAt: Date;
  period: DashboardTimeframe;
  ownerId: number;
};
