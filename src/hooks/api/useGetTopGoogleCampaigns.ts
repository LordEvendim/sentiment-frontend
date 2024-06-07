import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { TopMetaCampaign } from "./types/campaigns";

const fetchTopGoogleCampaigns = async () => {
  const result = await axiosMainServer.get<TopMetaCampaign[]>(
    "/google/campaigns/top"
  );

  return result.data;
};

export const useGetTopGoogleCampaigns = () => {
  const { data, isFetching } = useQuery({
    staleTime: 0,
    queryKey: [QueryKey.TopGoogleCampaigns],
    queryFn: () => fetchTopGoogleCampaigns(),
    retry: 0,
  });

  return {
    campaigns: data,
    isFetching,
  };
};
