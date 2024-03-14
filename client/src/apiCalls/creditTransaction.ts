import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";

type fetchTransactionsType = {
    contactId: string;
    month: number;
    year: number;
}

export const fetchTransactions = async ({ contactId, month, year }: fetchTransactionsType) => {
    const { data } = await api.get(`${url}/api/credit-transactions/${contactId}?month=${month}&year=${year}`);
    return data;
}

export const fetchTransaction = async (id: string) => {
    const { data } = await api.get(`${url}/api/credit-transactions/${id}`);
    return data;
}

type addTransactionType = {
    contactId: string;
    amount: number;
    date: string;
    comment: string;
    month: number;
    year: number;
}

export const addTransaction = async ({ contactId, amount, date, comment, month, year }: addTransactionType) => {
    const { data } = await api.post(`${url}/api/credit-transactions/${contactId}?month=${month}&year=${year}`, { amount, date, comment });
    return data;
}

type updateTransactionType = {
    id: string;
    amount: number;
    date: string;
    comment: string;
    paymentStatus: string;
    paymentDate: string;
    month: number;
    year: number;
}

export const updateTransaction = async ({ id, amount, date, comment, paymentStatus, paymentDate, month, year }: updateTransactionType) => {
    const { data } = await api.put(`${url}/api/credit-transactions/${id}?month=${month}&year=${year}`,
        { amount, date, comment, paymentStatus, paymentDate });
    return data;
}

type markAsPaidType = {
    contactId: string;
    fromDate: Date;
    toDate: Date;
    paymentDate: Date;
    month: number;
    year: number;
}

export const markAsPaid = async ({ contactId, fromDate, toDate, paymentDate, month, year }: markAsPaidType) => {
    const { data } = await api.put(`${url}/api/credit-transactions/paid/${contactId}?month=${month}&year=${year}`,
        { fromDate, toDate, paymentDate });
    return data;
}

export const deleteTransaction = async (id: string) => {
    const { data } = await api.delete(`${url}/api/credit-transactions/${id}`);
    return data;
}