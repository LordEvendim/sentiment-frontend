export const SERVER_URL =
  (import.meta.env.VITE_ENV as string) === "prod"
    ? "https://api.mediafusion.com"
    : "http://localhost:3001";
