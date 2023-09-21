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

type addExpensesPropType = {
    amount: number | string;
    categoryId: string;
    expenseType: string;
    comment: string;
    expenseDate: Date;
}

export const addExpense = async ({ amount, categoryId, expenseType, comment, expenseDate }: addExpensesPropType) => {
    const { data } = await api.post(`${url}/api/expense/`, {amount, categoryId, expenseType, comment, expenseDate});
    return data;
}