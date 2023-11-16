"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { updatePassword } from "@/apiCalls/auth";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

const UpdatePasswordModal = ({ setIsChangePassword }: any) => {
  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  const onUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { oldPassword, newPassword, confirmPassword } = passwordDetails;
      if (
        passwordRegex.test(oldPassword) &&
        passwordRegex.test(newPassword) &&
        newPassword === confirmPassword
      ) {
        const res: any = await updatePassword(passwordDetails);
        if (res.success) {
          setLoading(false);
          setIsChangePassword(false);
          toast.success("Password updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (!passwordRegex.test(oldPassword)) {
        toast.error("Invalid old password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!passwordRegex.test(newPassword)) {
        toast.error("Invalid new password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (newPassword !== confirmPassword) {
        toast.error("Password mismatch", {
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
      setLoading(false);
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

  return ReactDom.createPortal(
    <div className={`fixed inset-0 p-6 bg-[#0000005f] z-[600]`}>
      {loading && <LoadingSpinner />}
      <form
        className={`h-auto w-[95%] xxs:w-[350px] xs:w-[400px] md:w-[450px] overflow-y-scroll
        my-16 mx-auto text-slate-400 p-6 
        flex flex-col justify-start items-center gap-4 
        rounded-md shadow-md shadow-slate-500 bg-slate-950`}
        onSubmit={onUpdatePassword}
      >
        <h1 className={`text-2xl font-bold`}>Update Password</h1>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Old Password"
            value={passwordDetails?.oldPassword}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>
        
        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            value={passwordDetails?.newPassword}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={passwordDetails?.confirmPassword}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-900 
          bg-slate-950 transition-all duration-300`}
        >
          Update
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-950 
          bg-slate-900 transition-all duration-300`}
          onClick={() => setIsChangePassword(false)}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  );
};

export default UpdatePasswordModal;
