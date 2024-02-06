import React from "react";
import dynamic from "next/dynamic";
const DashboardContainer = dynamic(
  () => import("@/components/dashboard/DashboardContainer"),
  {
    ssr: false,
  }
);
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return <DashboardContainer />;
};

export default DashboardPage;
