import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { GetMetaAccounts } from "./types/accounts";

interface RequestData {
  adAccountId: number;
}

const selectAdAccount = async ({ adAccountId }: RequestData) => {
  const result = await axiosMainServer.post<{ selectedAdAccount: number }>(
    "/meta/selected-ad-account",
    {
      adAccountId: adAccountId,
    }
  );

  return result.data;
};

export const useSelectMetaAdAccount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: selectAdAccount,
    onSuccess: (data) => {
      queryClient.setQueryData<GetMetaAccounts>(
        [QueryKey.Accounts],
        (oldData) =>
          oldData
            ? {
                ...oldData,
                selectedAdAccount: data.selectedAdAccount,
              }
            : oldData
      );
    },
  });

  return {
    selectAdAccount: mutate,
    isPending,
  };
};
