import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";
import { Dashboards } from "#types/dashboard";
import { ReportData } from "#types/report";

import { useSession } from "./useSession";

const fetchGeneralDashboardData = async () => {
  const result = await axiosMainServer.get<ReportData>(
    "/reporter/dashboard/general"
  );

  return result.data;
};

export const useGetGeneralDashboardData = () => {
  const { userData } = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: Boolean(userData?.id),
    queryKey: [QueryKey.DashboardData, Dashboards.General],
    queryFn: () => fetchGeneralDashboardData(),
  });

  return {
    data,
    isFetching,
  };
};
