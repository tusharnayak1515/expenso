"use client";

import React, {useState} from "react";
import Image from "next/image";
import { useSelector, shallowEqual } from "react-redux";
import UpdateProfileModal from "../modals/UpdateProfileModal";
import UpdatePasswordModal from "../modals/UpdatePasswordModal";

const Details = () => {
  const { profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  return (
    <>

      {isUpdateProfile && <UpdateProfileModal setIsUpdateProfile={setIsUpdateProfile} /> }
      {isChangePassword && <UpdatePasswordModal setIsChangePassword={setIsChangePassword} /> }

      <div className={`relative h-[13rem] w-[13rem] rounded-full`}>
        <Image src={profile?.dp} alt="DP" fill className={`rounded-full`} />
      </div>
      <p>Name: {profile?.name}</p>
      <p>Email: {profile?.email}</p>

      <button
        className={`w-[180px] py-2 px-4 text-slate-400 font-semibold 
      border border-slate-400 rounded-md 
      hover:bg-slate-900 bg-slate-950 transition-all duration-300`}
      onClick={()=> setIsUpdateProfile(true)}
      >
        Update Profile
      </button>

      <button
        className={`w-[180px] py-2 px-4 text-slate-400 font-semibold 
      border border-slate-400 rounded-md 
      hover:bg-slate-950 bg-slate-900 transition-all duration-300`}
      onClick={()=> setIsChangePassword(true)}
      >
        Change Password
      </button>
    </>
  );
};

export default Details;
