"use client";

import React from "react";
import { useDispatch } from "react-redux";

import { RxDashboard } from "react-icons/rx";
import { FaMoneyBill, FaUserAlt } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { AiFillGold } from "react-icons/ai";
import { GoGoal } from "react-icons/go";
import { RiShutDownLine } from "react-icons/ri";
import { actionCreators } from "@/redux";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const params = usePathname();
  const dispatch: any = useDispatch();

  const onLinkClick = (route: string) => {
    switch (route) {
      case "dashboard":
        router.push("/");
        break;
      case "credits":
        router.push("/credits");
        break;
      case "expenses":
        router.push("/expenses");
        break;
      case "investments":
        router.push("/investments");
        break;
      case "goals":
        router.push("/goals");
        break;
      case "profile":
        router.push("/profile");
        break;

      default:
        router.push("/");
        break;
    }
  };

  const onLogout = () => {
    dispatch(actionCreators.logout());
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div
      className={`h-[calc(100vh-120px)] w-full p-3 text-[17px] text-slate-400 
    flex flex-col justify-start items-start gap-2 rounded-md bg-slate-900`}
    >
      <div
        className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md ${params === '/' ? 'bg-slate-600' : 'bg-transparent'} hover:bg-slate-600 transition-all`}
        onClick={() => onLinkClick("dashboard")}
      >
        <RxDashboard className={`text-2xl`} />
        <p>Dashboard</p>
      </div>

      <div
        className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md ${params === '/goals' ? 'bg-slate-600' : 'bg-transparent'} hover:bg-slate-600 transition-all`}
        onClick={() => onLinkClick("goals")}
      >
        <GoGoal className={`text-2xl`} />
        <p>Goals</p>
      </div>

      <div
        className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md ${params === '/profile' ? 'bg-slate-600' : 'bg-transparent'} hover:bg-slate-600 transition-all`}
        onClick={() => onLinkClick("profile")}
      >
        <FaUserAlt className={`text-2xl`} />
        <p>Profile</p>
      </div>

      <div
        className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}
        onClick={onLogout}
      >
        <RiShutDownLine className={`text-2xl`} />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
