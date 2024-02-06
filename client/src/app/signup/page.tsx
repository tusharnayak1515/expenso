import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const AuthContainer = dynamic(
  () => import("@/components/AuthContainer"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Signup",
};

const Signup = () => {
  return (
    <AuthContainer type={"signup"} />
  );
};

export default Signup;
