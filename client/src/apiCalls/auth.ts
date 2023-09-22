import api from "@/utils/api";

const url = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "";

type sendOtpProps = {
    email: String;
}

export const sendOtp = async ({ email }: sendOtpProps) => {
    const { data } = await api.post(`${url}/api/otp/send`, { email });
    return data;
}

type signupProps = {
    name: String;
    email: String;
    password: String;
    otp: number;
}

export const userSignup = async ({ name, email, password, otp }: signupProps) => {
    const { data } = await api.post(`${url}/api/auth/signup`, { name, email, password, otp });
    return data;
}

type signinProps = {
    email: String;
    password: String;
}

export const userSignin = async ({ email, password }: signinProps) => {
    const { data } = await api.post(`${url}/api/auth/signin`, { email, password });
    return data;
}