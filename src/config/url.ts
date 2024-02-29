export const SERVER_URL =
  (import.meta.env.VITE_ENV as string) === "prod"
    ? "https://api.clickclarity.ai"
    : "https://localhost:3001";
