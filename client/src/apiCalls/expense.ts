import api from "@/utils/api";

const url = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "";

type fetchExpensesPropType = {
    year: number;
    month: number;
}

export const fetchMyExpenses = async ({ year, month }: fetchExpensesPropType) => {
    const { data } = await api.get(`${url}/api/expense?year=${year}&month=${month}`);
    return data;
}