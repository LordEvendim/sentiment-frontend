import axios from "axios";

import { SERVER_URL } from "./url";

export const axiosMainServer = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
