import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

import { GetGoogleAccounts } from "./types/accounts";

interface RequestData {
  accountId: number;
}

const selectAdAccount = async ({ accountId }: RequestData) => {
  const result = await axiosMainServer.post<{ selectedAccount: number }>(
    "/google/selected-ad-account",
    {
      accountId: accountId,
    }
  );

  return result.data.selectedAccount;
};

export const useSelectGoogleAdAccount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: selectAdAccount,
    onSuccess: (selectedAccountId) => {
      queryClient.setQueryData<GetGoogleAccounts>(
        [QueryKey.GoogleAccounts],
        (oldData) =>
          oldData
            ? {
                ...oldData,
                selectedAdAccount: selectedAccountId,
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
