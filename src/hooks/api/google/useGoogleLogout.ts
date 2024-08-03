import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

const logout = async () => {
  const result = await axiosMainServer.delete(`/google/logout`);

  return result.data;
};

export const useGoogleLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QueryKey.GoogleIntegration] });
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
