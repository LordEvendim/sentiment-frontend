import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

const logout = async () => {
  const result = await axiosMainServer.delete(`/auth/logout`);

  return result.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QueryKey.Session] });
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
