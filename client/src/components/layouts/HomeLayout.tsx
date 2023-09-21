import React from "react";
import Sidebar from "../Sidebar";

const HomeLayout = ({ children }: any) => {
  return (
    <div
      className={`h-[calc(100vh-80px)] w-full p-6 grid grid-cols-12 gap-6 bg-slate-600`}
    >
      <div className={`col-span-2`}>
        <Sidebar />
      </div>

      <div className={`col-span-10 grid grid-cols-12 gap-6`}>{children}</div>
    </div>
  );
};

export default HomeLayout;
