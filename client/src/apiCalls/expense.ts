import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";

type fetchExpensesPropType = {
    year: number;
    month: number;
    expenseType: any;
}

export const fetchMyExpenses = async ({ year, month, expenseType }: fetchExpensesPropType) => {
    const { data } = await api.get(`${url}/api/expense?year=${year}&month=${month}&expenseType=${expenseType}`);
    return data;
}

type addExpensePropType = {
    amount: number | string;
    categoryId: string;
    expenseType: string;
    comment: string;
    expenseDate: Date;
    year: number;
    month: number;
}

export const addExpense = async ({ amount, categoryId, expenseType, comment, expenseDate, year, month, }: addExpensePropType) => {
    const { data } = await api.post(`${url}/api/expense?year=${year}&month=${month}`, { amount, categoryId, expenseType, comment, expenseDate });
    return data;
}

type updateExpensePropType = {
    expenseId: string;
    amount: number | string;
    categoryId: string;
    expenseType: string;
    comment: string;
    expenseDate: Date;
    year: number;
    month: number;
}

export const updateExpense = async ({ expenseId, amount, categoryId, expenseType, comment, expenseDate, year, month, }: updateExpensePropType) => {
    const { data } = await api.put(`${url}/api/expense?year=${year}&month=${month}`, { expenseId, amount, categoryId, expenseType, comment, expenseDate });
    return data;
}

type deleteExpensePropType = {
    expenseId: string;
    year: number;
    month: number;
}

export const deleteExpense = async ({ expenseId, year, month }: deleteExpensePropType) => {
    console.log("expenseId: ",expenseId);
    const { data } = await api.delete(`${url}/api/expense/${expenseId}?year=${year}&month=${month}`);
    return data;
}