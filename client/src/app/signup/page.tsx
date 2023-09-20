"use client";

import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div
      className={`min-h-[100vh] w-full p-4 md:p-6 flex flex-col justify-center md:justify-start items-center gap-4 bg-slate-600`}
    >
      <form
        className={`w-[100%] xxs:w-[400px] xs:w-[450px] md:w-[500px] my-16 p-6 text-slate-300 
        flex flex-col justify-start items-center gap-4 
        rounded-md shadow-md shadow-slate-600 bg-slate-900`}
      >
        <h1 className={`text-2xl font-bold`}>Signup</h1>
        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            className={`w-full py-2 px-4 border border-slate-400 rounded-md outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
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
            className={`w-full py-2 px-4 border border-slate-400 rounded-md outline-none bg-slate-800`}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold border border-slate-400 rounded-md hover:bg-slate-800 bg-slate-900 transition-all duration-300`}
        >
          Signup
        </button>

        <p>
          Already have an account?{" "}
          <Link href="/signin" className={`text-blue-400 font-semibold`}>
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
