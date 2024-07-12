import { startOfDay, subDays, subMonths, subYears } from "date-fns";

export type DashboardTimeframe =
  | "last-7-days"
  | "last-14-days"
  | "last-30-days"
  | "last-90-days"
  | "last-6-months"
  | "last-year";

const timeframeStartFunctions: Record<DashboardTimeframe, (end: Date) => Date> =
  {
    "last-7-days": (end) => subDays(end, 7),
    "last-14-days": (end) => subDays(end, 14),
    "last-30-days": (end) => subDays(end, 30),
    "last-90-days": (end) => subDays(end, 90),
    "last-6-months": (end) => subMonths(end, 6),
    "last-year": (end) => subYears(end, 1),
  };

export const calculateTimeframeStart = (
  now: Date,
  timeframe: DashboardTimeframe
) => startOfDay(timeframeStartFunctions[timeframe](now));
