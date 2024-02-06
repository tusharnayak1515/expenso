import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const GoalsContainer = dynamic(
  () => import("@/components/goals/GoalsContainer"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Goals",
};

const Goals = () => {
  return <GoalsContainer />;
};

export default Goals;
