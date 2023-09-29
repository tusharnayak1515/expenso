"use client"

import React from "react";
import dynamic from "next/dynamic";
const Sidebar = dynamic(()=> import("../Sidebar"), {ssr: false});
import { usePathname } from "next/navigation";

const HomeLayout = ({ children }: any) => {
  const pathname = usePathname();
  return (
    <div
      className={`min-h-[calc(100vh-80px)] w-full p-6 grid grid-cols-12 gap-4 bg-slate-600`}
    >
      {["/signup", "/signin"].indexOf(pathname) === -1 && (
        <div className={`col-span-3 xl:col-span-2 hidden lg1:block`}>
          <Sidebar />
        </div>
      )}

      <div
        className={`${
          ["/signup", "/signin"].indexOf(pathname) !== -1
            ? "col-span-12"
            : "col-span-12 lg1:col-span-9 xl:col-span-10"
        } grid grid-cols-12 gap-6`}
      >
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
