"use client";

import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import { RxDashboard } from "react-icons/rx";
import { FaUserAlt, FaUserCheck } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { RiShutDownLine } from "react-icons/ri";
import { actionCreators } from "@/redux";
import { toast } from "react-toastify";
import { IoMdLogIn } from "react-icons/io";
import { logoutUser } from "@/apiCalls/auth";
import Link from "next/link";

const Sidebar = ({ modal, setShowMenu }: any) => {
  const pathName = usePathname();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);

  const onLinkClick = () => {
    if (modal) {
      setShowMenu(false);
    }
  };

  const onLogout = async () => {
    dispatch(actionCreators.logout());
    onLinkClick();

    try {
      await logoutUser();
    } catch (error: any) {
      console.log("Error in logout, in sidebar: ", error);
    }

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
      className={`${
        modal ? "h-[100vh]" : "h-[calc(100vh-120px)]"
      } w-full p-3 text-[17px] text-slate-400 
    flex flex-col justify-start items-start gap-2 rounded-md bg-slate-900`}
    >
      {modal && (
        <Link
          href="/"
          onClick={onLinkClick}
          className={`my-4 text-2xl text-slate-400 font-bold mx-auto`}
        >
          Expenso
        </Link>
      )}

      {user && (
        <Link
          href="/dashboard"
          onClick={onLinkClick}
          className={`w-full cursor-pointer rounded-md ${
            pathName === "/dashboard" ? "bg-slate-600" : "bg-transparent"
          } hover:bg-slate-600 transition-all`}
        >
          <div className={`w-full p-3 flex justify-start items-center gap-4`}>
            <RxDashboard className={`text-2xl`} />
            <p>Dashboard</p>
          </div>
        </Link>
      )}

      {user && (
        <Link
          href="/goals"
          onClick={onLinkClick}
          className={`w-full cursor-pointer rounded-md ${
            pathName === "/goals" ? "bg-slate-600" : "bg-transparent"
          } hover:bg-slate-600 transition-all`}
        >
          <div className={`w-full p-3 flex justify-start items-center gap-4`}>
            <GoGoal className={`text-2xl`} />
            <p>Goals</p>
          </div>
        </Link>
      )}

      {user && (
        <Link
          href="/profile"
          onClick={onLinkClick}
          className={`w-full cursor-pointer rounded-md ${
            pathName === "/profile" ? "bg-slate-600" : "bg-transparent"
          } hover:bg-slate-600 transition-all`}
        >
          <div className={`w-full p-3 flex justify-start items-center gap-4`}>
            <FaUserAlt className={`text-2xl`} />
            <p>Profile</p>
          </div>
        </Link>
      )}

      {user && (
        <div
          className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}
          onClick={onLogout}
        >
          <RiShutDownLine className={`text-2xl`} />
          <p>Logout</p>
        </div>
      )}

      {!user && (
        <Link
          href="/signup"
          onClick={onLinkClick}
          className={`w-full cursor-pointer rounded-md ${
            pathName === "/signup" ? "bg-slate-600" : "bg-transparent"
          } hover:bg-slate-600 transition-all`}
        >
          <div className={`w-full p-3 flex justify-start items-center gap-4`}>
            <FaUserCheck className={`text-2xl`} />
            <p>Signup</p>
          </div>
        </Link>
      )}

      {!user && (
        <Link
          href="/signin"
          onClick={onLinkClick}
          className={`w-full cursor-pointer rounded-md ${
            pathName === "/signin" ? "bg-slate-600" : "bg-transparent"
          } hover:bg-slate-600 transition-all`}
        >
          <div className={`w-full p-3 flex justify-start items-center gap-4`}>
            <IoMdLogIn className={`text-2xl`} />
            <p>Signin</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
