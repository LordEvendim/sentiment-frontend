import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, subDays } from "date-fns";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

interface Data {
  timeframe: DashboardTimeframe;
}

const generateReport = async ({ timeframe }: Data) => {
  const since = format(
    calculateTimeframeStart(new Date(Date.now()), timeframe).getTime(),
    "yyyyMMdd"
  );
  const untilDate = subDays(new Date(Date.now()), 1);
  const until = format(untilDate, "yyyyMMdd");

  const result = await axiosMainServer.post<Report>("/reporter/overview", {
    since,
    until,
    timeframe,
  });

  return {
    data: result.data,
    timeframe,
    until: untilDate,
  };
};

export const useGenerateReport = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: generateReport,
    onSuccess: (report) => {
      queryClient.setQueryData<Report>(
        [QueryKey.Report, report.timeframe, undefined],
        () => report.data
      );
      queryClient.setQueryData<{ value: number | undefined }>(
        [QueryKey.Credits],
        (credits) =>
          credits === undefined || credits?.value === undefined
            ? undefined
            : { value: credits.value - 1 }
      );
    },
  });

  return {
    generateReport: mutate,
    isPending,
  };
};
