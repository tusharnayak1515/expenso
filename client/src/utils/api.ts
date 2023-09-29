import axios from 'axios';
import { getCookie } from 'cookies-next';

const BACKEND_URL = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "authorization": getCookie("authorization")
  }
});

export default api;