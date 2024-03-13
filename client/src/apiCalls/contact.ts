import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";

export const fetchMyContacts = async () => {
    const { data } = await api.get(`${url}/api/contacts`);
    return data;
}

export const fetchContact = async (id:string) => {
    const { data } = await api.get(`${url}/api/contacts/${id}`);
    return data;
}

type addContactType = {
    name: string;
    type: string;
    phone: string;
}

export const addContact = async ({ name, type, phone }: addContactType) => {
    const { data } = await api.post(`${url}/api/contacts/`, { name, type, phone });
    return data;
}

type updateContactType = {
    id: string;
    name: string;
    type: string;
    phone: string;
}

export const updateContact = async ({ id, name, type, phone }: updateContactType) => {
    const { data } = await api.put(`${url}/api/contacts/${id}`, {  name, type, phone });
    return data;
}

export const deleteContact = async (id: string) => {
    const { data } = await api.delete(`${url}/api/contacts/${id}`);
    return data;
}