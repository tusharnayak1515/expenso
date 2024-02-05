"use client";

import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const params = usePathname();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);

  const onLinkClick = (route: string) => {
    switch (route) {
      case "dashboard":
        router.push("/dashboard");
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
      case "signup":
        router.push("/signup");
        break;
      case "signin":
        router.push("/signin");
        break;

      default:
        router.push("/");
        break;
    }
    if (modal) {
      setShowMenu(false);
    }
  };

  const onLogout = async () => {
    dispatch(actionCreators.logout());
    if (modal) {
      setShowMenu(false);
    }

    try {
      await logoutUser();
    } catch (error:any) {
      console.log("Error in logout, in sidebar: ",error);
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
        <p onClick={() => onLinkClick("")} className={`my-4 text-2xl text-slate-400 font-bold mx-auto`}>
          Expenso
        </p>
      )}

      {user && (
        <div
          className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md ${
        params === "/dashboard" ? "bg-slate-600" : "bg-transparent"
      } hover:bg-slate-600 transition-all`}
          onClick={() => onLinkClick("dashboard")}
        >
          <RxDashboard className={`text-2xl`} />
          <p>Dashboard</p>
        </div>
      )}

      {user && (
        <div
          className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md ${
        params === "/goals" ? "bg-slate-600" : "bg-transparent"
      } hover:bg-slate-600 transition-all`}
          onClick={() => onLinkClick("goals")}
        >
          <GoGoal className={`text-2xl`} />
          <p>Goals</p>
        </div>
      )}

      {user && (
        <div
          className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md ${
        params === "/profile" ? "bg-slate-600" : "bg-transparent"
      } hover:bg-slate-600 transition-all`}
          onClick={() => onLinkClick("profile")}
        >
          <FaUserAlt className={`text-2xl`} />
          <p>Profile</p>
        </div>
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
        <div
          className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}
          onClick={() => onLinkClick("signup")}
        >
          <FaUserCheck className={`text-2xl`} />
          <p>Signup</p>
        </div>
      )}

      {!user && (
        <div
          className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}
          onClick={() => onLinkClick("signin")}
        >
          <IoMdLogIn className={`text-2xl`} />
          <p>Signin</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
