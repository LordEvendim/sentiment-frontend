import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { TopMetaCampaign } from "./types/campaigns";

const fetchTopMetaCampaigns = async () => {
  const result = await axiosMainServer.get<TopMetaCampaign[]>(
    "/meta/campaigns/top"
  );

  return result.data;
};

export const useGetTopMetaCampaigns = () => {
  const { data, isFetching } = useQuery({
    staleTime: 0,
    queryKey: [QueryKey.TopMetaCampaigns],
    queryFn: () => fetchTopMetaCampaigns(),
    retry: 0,
  });

  return {
    campaigns: data,
    isFetching,
  };
};
