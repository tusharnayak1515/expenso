import api from "@/utils/api";

const url = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";

type sendOtpProps = {
    email: String;
}

export const sendOtp = async ({ email }: sendOtpProps) => {
    const { data } = await api.post(`${url}/api/otp/send`, { email });
    return data;
}

type resetOtpProps = {
    email: String;
    otp: number;
}

export const verifyOtp = async ({ email, otp }: resetOtpProps) => {
    const { data } = await api.post(`${url}/api/otp/verify`, { email, otp });
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
    console.log("url: ",url);
    const { data } = await api.post(`${url}/api/auth/signin`, { email, password });
    return data;
}

export const updateProfile = async(formData:any)=> {
    const {data} = await api.put(`${url}/api/auth/update-profile`, formData);
    return data;
}

type updatePasswordPropType = {
    oldPassword: String;
    newPassword: String;
    confirmPassword: String;
}

export const updatePassword = async({oldPassword, newPassword, confirmPassword}:updatePasswordPropType)=> {
    const {data} = await api.put(`${url}/api/auth/change-password`, {oldPassword, newPassword, confirmPassword});
    return data;
}

type resetPasswordPropType = {
    email: String;
    newPassword: String;
    confirmPassword: String;
    otp: number;
}

export const resetPassword = async({email, newPassword, confirmPassword, otp}:resetPasswordPropType)=> {
    const {data} = await api.put(`${url}/api/auth/reset-password`, {email, newPassword, confirmPassword, otp});
    return data;
}

export const getProfile = async()=> {
    const {data} = await api.get(`${url}/api/auth/profile`);
    return data;
}