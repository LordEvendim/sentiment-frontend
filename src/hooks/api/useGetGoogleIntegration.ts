import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { GoogleAdAccount, GoogleAnalyticsAccount } from "./types/accounts";
import { useSession } from "./useSession";

export interface GoogleIntegration {
  id: number;
  ownerId: number;
  selectedPage: GoogleAnalyticsAccount | null;
  selectedAdAccount: GoogleAdAccount | null;
  accessToken: string | null;
}

const fetchGoogleIntegration = async () => {
  const result = await axiosMainServer.get<GoogleIntegration>(
    "/google/integration"
  );

  return result.data;
};

export const useGetGoogleIntegration = () => {
  const { userData } = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: Boolean(userData?.id),
    queryKey: [QueryKey.GoogleIntegration],
    queryFn: () => fetchGoogleIntegration(),
  });

  return {
    googleIntegration: data,
    isFetching,
  };
};
