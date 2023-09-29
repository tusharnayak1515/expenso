import api from "@/utils/api";

const url = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";

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
}

export const addExpense = async ({ amount, categoryId, expenseType, comment, expenseDate }: addExpensePropType) => {
    const { data } = await api.post(`${url}/api/expense/`, { amount, categoryId, expenseType, comment, expenseDate });
    return data;
}

type updateExpensePropType = {
    expenseId: string;
    amount: number | string;
    categoryId: string;
    expenseType: string;
    comment: string;
    expenseDate: Date;
}

export const updateExpense = async ({ expenseId, amount, categoryId, expenseType, comment, expenseDate }: updateExpensePropType) => {
    const { data } = await api.put(`${url}/api/expense/`, { expenseId, amount, categoryId, expenseType, comment, expenseDate });
    return data;
}

type deleteExpensePropType = {
    expenseId: string;
}

export const deleteExpense = async ({ expenseId }: deleteExpensePropType) => {
    console.log("expenseId: ",expenseId);
    const { data } = await api.delete(`${url}/api/expense/${expenseId}`);
    return data;
}