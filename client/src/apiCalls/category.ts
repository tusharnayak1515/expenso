import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";

export const fetchAllCategories = async () => {
    const { data } = await api.get(`${url}/api/categories/`);
    return data;
}