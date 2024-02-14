import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data ?? "Server Error");
  }

  throw new Error("Server error");
};
