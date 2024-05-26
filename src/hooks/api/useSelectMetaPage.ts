import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { GetMetaAccounts } from "./types/accounts";

interface RequestData {
  pageId: number;
}

const selectPage = async ({ pageId }: RequestData) => {
  const result = await axiosMainServer.post<{ selectedPage: number }>(
    "/meta/selected-page",
    {
      pageId: pageId,
    }
  );

  return result.data;
};

export const useSelectMetaPage = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: selectPage,
    onSuccess: (data) => {
      queryClient.setQueryData<GetMetaAccounts>(
        [QueryKey.Accounts],
        (oldData) =>
          oldData
            ? {
                ...oldData,
                selectedPage: data.selectedPage,
              }
            : oldData
      );

      queryClient.invalidateQueries({ queryKey: [QueryKey.MetaIntegration] });
    },
  });

  return {
    selectPage: mutate,
    isPending,
  };
};
