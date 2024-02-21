import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { GetAccounts } from "./types/accounts";

interface RequestData {
  userId: number;
  pageId: string;
}

const selectPage = async ({ pageId, userId }: RequestData) => {
  const result = await axiosMainServer.post<number>("/meta/selected-page", {
    userId: userId.toString(),
    pageId: pageId,
  });

  return result.data;
};

export const useSelectPage = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: selectPage,
    onSuccess: (selectedPageId) => {
      queryClient.setQueryData<GetAccounts>(
        [QueryKey.Accounts, userId],
        (oldData) =>
          oldData
            ? {
                ...oldData,
                selectedPage: selectedPageId.toString(),
              }
            : oldData
      );
    },
  });

  return {
    selectPage: mutate,
    isPending,
  };
};
