"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, userSignin, userSignup } from "@/apiCalls/auth";
import Link from "next/link";
import { toast } from "react-toastify";
import { actionCreators } from "@/redux";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

type AuthPropTypes = {
  type: string;
};

const Auth = ({ type }: AuthPropTypes) => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const [userDetails, setUserDetails]: any = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = userDetails;
    try {
      if (emailRegex.test(email)) {
        setIsLoading(true);
        const res: any = await sendOtp({ email });
        if (res.success) {
          setOtpSent(true);
          setIsLoading(false);
          toast.success(`OTP sent to ${email}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("Invalid email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, otp } = userDetails;
    try {
      if (
        name.replace("/s/g", "").trim().length !== 0 &&
        emailRegex.test(email) &&
        passwordRegex.test(password) &&
        otp.toString().length === 4
      ) {
        setIsLoading(true);
        const res = await userSignup({ name, email, password, otp });
        if (res.success) {
          setIsLoading(false);
          setUserDetails({ name: "", email: "", password: "", otp: "" });
          router.push("/signin");
          toast.success("Registration successfull", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (name.replace("/s/g", "").trim().length === 0) {
        toast.error("Name cannot be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!emailRegex.test(email)) {
        toast.error("Invalid email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!passwordRegex.test(password)) {
        toast.error("Enter a strong password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Invalid OTP", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userDetails;
    try {
      if (
        emailRegex.test(email) &&
        password.replace("/s/g", "").trim().length !== 0
      ) {
        setIsLoading(true);
        const res = await userSignin({ email, password });
        if (res.success) {
          setIsLoading(false);
          localStorage.setItem(
            "expenso_user_profile",
            JSON.stringify(res.user)
          );
          setUserDetails({...userDetails, email: "", password: ""});
          dispatch(actionCreators.userSignin(res.user));
          toast.success("Welcome Back", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (!emailRegex.test(email)) {
        toast.error("Invalid email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Password cannot be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div
        className={`h-auto w-full p-4 md:p-6 flex flex-col justify-center md:justify-start items-center gap-4`}
      >
        <form
          className={`w-[100%] xxs:w-[400px] xs:w-[450px] p-6 text-slate-300 
        flex flex-col justify-start items-center gap-4 
        rounded-md shadow-md shadow-slate-600 bg-slate-900`}
          onSubmit={
            type === "signin" ? onLogin : otpSent ? onRegister : onSendOtp
          }
        >
          <h1 className={`text-2xl font-bold`}>
            {type === "signin" ? `Signin` : `Signup`}
          </h1>

          {type === "signup" && (
            <div
              className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                value={userDetails?.name}
                onChange={onChangeHandler}
                readOnly={otpSent}
                className={`w-full py-2 px-4 border border-slate-400 rounded-md outline-none bg-slate-800`}
              />
            </div>
          )}

          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
              value={userDetails?.email}
              onChange={onChangeHandler}
              readOnly={otpSent}
              className={`w-full py-2 px-4 border border-slate-400 rounded-md outline-none bg-slate-800`}
            />
          </div>

          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={userDetails?.password}
              onChange={onChangeHandler}
              readOnly={otpSent}
              className={`w-full py-2 px-4 border border-slate-400 rounded-md outline-none bg-slate-800`}
            />
          </div>

          {type === "signup" && otpSent && (
            <div
              className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
            >
              <label htmlFor="otp">OTP</label>
              <input
                type="number"
                name="otp"
                id="otp"
                placeholder="123456"
                value={userDetails?.otp}
                onChange={onChangeHandler}
                className={`w-full py-2 px-4 border border-slate-400 rounded-md outline-none bg-slate-800`}
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold border border-slate-400 rounded-md hover:bg-slate-800 bg-slate-900 transition-all duration-300`}
          >
            {type === "signin" ? `Signin` : `Signup`}
          </button>

          {type === "signin" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className={`text-blue-400 font-semibold`}>
                Signup
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link href="/signin" className={`text-blue-400 font-semibold`}>
                Signin
              </Link>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Auth;
