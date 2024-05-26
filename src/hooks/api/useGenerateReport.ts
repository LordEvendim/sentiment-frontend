import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

const generateReport = async () => {
  const result = await axiosMainServer.post<Report>("/reporter/general/weekly");

  return result.data;
};

export const useGenerateReport = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: generateReport,
    onSuccess: (report) => {
      queryClient.setQueryData<Report>([QueryKey.Report], () => report);
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
