import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { Report } from "./types/report";
import { useGetMetaIntegration } from "./useGetMetaIntegration";

const fetchReport = async () => {
  const result = await axiosMainServer.get<Report>("/reporter/general/weekly");

  return result.data;
};

export const useGetReport = () => {
  const integration = useGetMetaIntegration();

  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    enabled: Boolean(integration.metaIntegration?.accessToken),
    queryKey: [QueryKey.Report],
    queryFn: () => fetchReport(),
    retry: 0,
  });

  return {
    report: data,
    isFetching,
  };
};
