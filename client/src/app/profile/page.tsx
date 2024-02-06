import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const ProfileContainer = dynamic(
  () => import("@/components/profile/ProfileContainer"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = () => {
  return <ProfileContainer />;
};

export default Profile;
