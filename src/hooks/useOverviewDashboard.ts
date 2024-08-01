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
  selectedReferenceMetric: SelectedMetricDetails;
  select: (metricDetails: SelectedMetricDetails) => void;
  selectReference: (metricDetails: SelectedMetricDetails) => void;
}

export const useOverviewDashbaord = create<OverviewDashboardState>()(
  persist(
    (set) => ({
      selectedMetric: {
        metrics: [
          {
            metricId: "spend",
            source: "meta-ads",
          },
          {
            metricId: "cost_micros",
            source: "google-ads",
          },
        ],
        name: "Spend",
      },
      selectedReferenceMetric: {
        metrics: [
          {
            metricId: "conversions",
            source: "google-ads",
          },
        ],
        name: "Conversions",
      },
      select: (selectedMetricDetails) =>
        set({ selectedMetric: selectedMetricDetails }),
      selectReference: (selectedMetricDetails) =>
        set({ selectedReferenceMetric: selectedMetricDetails }),
    }),
    {
      name: "overview-dashboard-state",
    }
  )
);
