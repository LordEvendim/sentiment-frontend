import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ReportMetricSource } from "#types/report";

export interface SelectedMetricDetails {
  metrics: {
    metricId: string;
    source: ReportMetricSource;
  }[];
  name: string;
}

interface OverviewDashboardState {
  selectedMetric: SelectedMetricDetails;
  select: (metricDetails: SelectedMetricDetails) => void;
}

export const useOverviewDashbaord = create<OverviewDashboardState>()(
  persist(
    (set) => ({
      selectedMetric: {
        metrics: [
          {
            metricId: "cost_micros",
            source: "google-ads",
          },
          {
            metricId: "spend",
            source: "meta-ads",
          },
        ],
        name: "Spend",
      },
      select: (selectedMetricDetails) =>
        set({ selectedMetric: selectedMetricDetails }),
    }),
    {
      name: "app-state",
    }
  )
);
