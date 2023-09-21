"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";
const Details = dynamic(()=> import("@/components/profile/Details"), {ssr: false});

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
  }, [user, router]);

  return (
    <div>
      <Details />
    </div>
  );
};

export default Profile;
