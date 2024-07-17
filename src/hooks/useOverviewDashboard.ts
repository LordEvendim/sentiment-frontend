import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ReportMetricSource } from "#types/report";

export interface SelectedMetricDetails {
  metricId: string;
  source: ReportMetricSource;
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
        metricId: "spend",
        name: "Ad spend",
        source: "meta-ads",
      },
      select: (selectedMetricDetails) =>
        set({ selectedMetric: selectedMetricDetails }),
    }),
    {
      name: "app-state",
    }
  )
);
