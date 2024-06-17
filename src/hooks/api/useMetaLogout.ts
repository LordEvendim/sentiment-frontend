import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

const logout = async () => {
  const result = await axiosMainServer.delete(`/meta/logout`);

  return result.data;
};

export const useMetaLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QueryKey.MetaIntegration] });
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
