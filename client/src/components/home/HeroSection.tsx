"use client";

import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";
Chart.register(CategoryScale);

const HeroSection = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const [legendPosition, setLegendPosition]: any = useState("bottom");

  const onGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };

  const dummyData = [
    { category: "Food", total: 200 },
    { category: "Entertainment", total: 100 },
    { category: "Utilities", total: 150 },
  ];

  const data = {
    labels: dummyData.map((item) => item.category),
    datasets: [
      {
        label: "Amount",
        data: dummyData.map((item) => item.total),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={`h-auto w-full bg-slate-900]`}>
      <div
        className={`min-h-[70vh] w-full text-slate-300 
        grid grid-cols-1 md_link:grid-cols-2`}
      >
        <div
          className={`h-auto w-full border-b border-r-0 md_link:border-r md_link:border-b-0 border-slate-400`}
        >
          <div
            className={`min-h-[50vh] md:min-h-[55vh] md_link:min-h-full w-[calc(100%-30px)] sm:w-[calc(100%-50px)] 
            mx-auto p-6 sm:p-8 lg1:p-14 flex justify-center items-center`}
          >
            <div
              className={`w-full xl:w-[85%] flex flex-col justify-start items-center md_link:items-start gap-4`}
            >
              <p
                className={`text-2xl sm:text-3xl md:text-4xl text-center md_link:text-left font-bold`}
              >
                Manage your expenses easily with Expenso
              </p>

              <p
                className={`w-full xs:w-[400px] sm:w-[500px] md_link:w-full text-slate-400 text-center md_link:text-left`}
              >
                Expenso allows you to easily track and manage personal expenses
                on the go. Users can log daily costs, set budgets, monitor
                spending patterns, and stay on top of finances from their phone
                or web dashboard. Expenso syncs data across devices for seamless
                expense tracking anytime, anywhere.
              </p>

              <button
                onClick={onGetStarted}
                className={`py-3 px-6 text-slate-200 rounded-sm bg-slate-700 hover:bg-slate-600`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div
          className={`h-full w-full p-6 sm:p-12 lg1:p-14 flex justify-center items-center`}
        >
          <Pie
            data={data}
            width={200}
            height={200}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: legendPosition,
                  labels: {
                    padding: 30,
                    boxPadding: 20,
                    color: "#f2f8ff"
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
