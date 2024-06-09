import { startOfDay, subDays, subMonths, subWeeks, subYears } from "date-fns";

export type DashboardTimeframe =
  | "last-week"
  | "last-month"
  | "last-90-days"
  | "last-year";

const timeframeStartFunctions: Record<DashboardTimeframe, (end: Date) => Date> =
  {
    "last-90-days": (end) => subDays(end, 90),
    "last-month": (end) => subMonths(end, 1),
    "last-week": (end) => subWeeks(end, 1),
    "last-year": (end) => subYears(end, 1),
  };

export const calculateTimeframeStart = (
  now: Date,
  timeframe: DashboardTimeframe
) => startOfDay(timeframeStartFunctions[timeframe](subDays(now, 1)));
