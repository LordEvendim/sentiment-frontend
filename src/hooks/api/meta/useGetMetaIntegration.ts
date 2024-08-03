import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { useSession } from "../auth/useSession";

interface MetaPage {
  name: string;
  pageId: number;
  profilePictureURL: string | null;
}

interface MetaAdAccount {
  id: number;
  parentAccountName: string;
}

interface MetaIntegration {
  id: number;
  fullName: string | null;
  email: string | null;
  ownerId: number;
  accessToken: string | null;
  tokenCreatedAt: string | null;
  metaId: string;
  selectedPage?: MetaPage;
  selectedAdAccount?: MetaAdAccount;
}

const fetchMetaIntegration = async () => {
  const result =
    await axiosMainServer.get<MetaIntegration>("/meta/integration");

  return result.data;
};

export const useGetMetaIntegration = () => {
  const { userData } = useSession();

  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: Boolean(userData?.id),
    queryKey: [QueryKey.MetaIntegration],
    queryFn: () => fetchMetaIntegration(),
  });

  return {
    metaIntegration: data,
    isFetching,
  };
};
