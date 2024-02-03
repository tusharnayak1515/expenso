"use client";

import { updateProfile } from "@/apiCalls/auth";
import { actionCreators } from "@/redux";
import React, { useState } from "react";
import ReactDom from "react-dom";
import { MdCloudUpload } from "react-icons/md";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";
import Image from "next/image";

const UpdateProfileModal = ({ setIsUpdateProfile }: any) => {
  const dispatch: any = useDispatch();
  const { profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const [userDetails, setUserDetaiils] = useState({
    name: profile?.name,
    email: profile?.email,
  });
  const [dp, setDp]: any = useState(profile?.dp);
  const [image, setImage]: any = useState(profile?.dp);
  const [loading, setLoading]: any = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetaiils({ ...userDetails, [name]: value });
  };

  const onDpChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.length !== 0) {
      console.log("dp: ",e.target.files);
      setImage(e.target.files && URL.createObjectURL(e.target.files[0]));
      setDp(e.target.files && e.target.files[0]);
    }
  };

  const onRemoveDp = () => {
    setDp(null);
  };

  const onUpdateProfile = async () => {
    setLoading(true);
    const {name,email} = userDetails;
    try {
      let userDp = null;
      if(dp && dp !== profile?.dp) {
        const data = new FormData();
        data.append("file", dp);
        data.append("upload_preset", "just_connect");
        data.append("cloud_name", "alpha2625");
        const response = await axios.post("https://api.cloudinary.com/v1_1/alpha2625/image/upload", data);
        userDp = response.data.secure_url;
      }
      else if(dp && dp === profile?.dp) {
        userDp = profile?.dp;
      }
      const res:any = await updateProfile({name,email,dp: userDp});
      if (res.success) {
        dispatch(actionCreators.updateProfile(res.user));
        setLoading(false);
        setIsUpdateProfile(false);
        toast.success("Profile updated successfully", {
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
      <div
        className={`h-[80vh] w-[95%] xxs:w-[350px] xs:w-[400px] md:w-[450px] overflow-y-scroll
        my-10 mx-auto text-slate-400 p-6 
        flex flex-col justify-start items-center gap-4 
        rounded-md shadow-md shadow-slate-500 bg-slate-950`}
      >
        <h1 className={`text-2xl font-bold`}>Update Profile</h1>

        <label htmlFor="dp" className={`w-full`}>
          <div
            className={`relative h-[40vh] w-full flex justify-center items-center border-[2px] border-dashed border-[#9099ff] rounded-md`}
          >
            {!dp || dp === "" ? (
              <MdCloudUpload
                className={`text-[6rem] text-[#9099ff] cursor-pointer hover:text-[#7e89ff]`}
              />
            ) : (
              <Image
                src={image}
                alt="Dp"
                fill
                className={`h-full w-full rounded-md`}
              />
            )}
          </div>
        </label>
        <input
          type="file"
          id="dp"
          accept="image/*"
          onChange={onDpChangeHandler}
          className={`hidden`}
        />

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
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={profile?.email}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-900 
          bg-slate-950 transition-all duration-300`}
          onClick={onUpdateProfile}
        >
          Update
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 text-slate-400 font-semibold
          border border-slate-400 rounded-md 
          hover:bg-slate-900 bg-slate-950`}
          onClick={onRemoveDp}
        >
          Remove
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-950 
          bg-slate-900 transition-all duration-300`}
          onClick={() => setIsUpdateProfile(false)}
        >
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default UpdateProfileModal;
