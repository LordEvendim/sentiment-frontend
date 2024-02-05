export const SERVER_URL =
  (import.meta.env.VITE_ENV as string) === "prod"
    ? "https://api.mediafusion.com"
    : "https://localhost:3001";
