import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

const generateReport = async () => {
  const result = await axiosMainServer.post<Report>("/reporter/page-weekly");

  console.log(JSON.stringify(result));

  return result.data;
};

export const useGenerateReport = (pageId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: generateReport,
    onSuccess: (report) => {
      queryClient.setQueryData<Report>([QueryKey.Report, pageId], () => report);
    },
  });

  return {
    generateReport: mutate,
    isPending,
  };
};
