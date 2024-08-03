import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { GetGoogleAccounts } from "../types/accounts";

interface RequestData {
  pageId: number;
}

const selectPage = async ({ pageId }: RequestData) => {
  const result = await axiosMainServer.post<{ selectedPage: number }>(
    "/google/selected-page",
    {
      pageId: pageId,
    }
  );

  return result.data.selectedPage;
};

export const useSelectGoogleAccount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: selectPage,
    onSuccess: (selectedPageId) => {
      queryClient.setQueryData<GetGoogleAccounts>(
        [QueryKey.GoogleAccounts],
        (oldData) =>
          oldData
            ? {
                ...oldData,
                selectedAnalyticsAccount: selectedPageId,
              }
            : oldData
      );

      queryClient.invalidateQueries({ queryKey: [QueryKey.GoogleIntegration] });
    },
  });

  return {
    selectPage: mutate,
    isPending,
  };
};
