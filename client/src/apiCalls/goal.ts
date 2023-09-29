import api from "@/utils/api";

const url = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";

export const fetchMyGoals = async () => {
    const { data } = await api.get(`${url}/api/goals`);
    return data;
}

type addGoalPropType = {
    goal: string;
    amount: number | string;
}

export const addGoal = async ({ goal, amount }: addGoalPropType) => {
    const { data } = await api.post(`${url}/api/goals/`, { goal, amount });
    return data;
}

type updateGoalPropType = {
    id: string;
    goal: string;
    amount: number | string;
    status: string;
    completedDate: Date | null;
}

export const updateGoal = async ({ id, goal, amount, status, completedDate }: updateGoalPropType) => {
    const { data } = await api.put(`${url}/api/goals/`, { id, goal, amount, status, completedDate });
    return data;
}

type deleteGoalPropType = {
    id: string;
}

export const deleteGoal = async ({ id }: deleteGoalPropType) => {
    const { data } = await api.delete(`${url}/api/goals/${id}`);
    return data;
}