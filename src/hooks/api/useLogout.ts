import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

const logout = async (userId: string) => {
  const result = await axiosMainServer.delete(`/users/${userId}/session`);

  return result.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [QueryKey.Session] });
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
