import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { useFacebook } from "#stores/useFacebook";

import { Report } from "./types/report";

const fetchReport = async () => {
  const result = await axiosMainServer.get<Report>("/reporter/page-weekly");

  return result.data;
};

export const useGetReport = (pageId: string | undefined) => {
  const isLogged = useFacebook((state) => state.isLogged);

  const { data, isFetching } = useQuery({
    staleTime: 60 * 1000,
    enabled: isLogged && Boolean(pageId),
    queryKey: [QueryKey.Report, pageId],
    queryFn: () => fetchReport(),
    retry: 0,
  });

  return {
    report: data,
    isFetching,
  };
};
