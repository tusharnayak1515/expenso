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
  title: "Signin",
};

const Signin = () => {
  return (
    <AuthContainer type={"signin"} />
  );
};

export default Signin;
