"use client";

import React from "react";
import { Pie } from "react-chartjs-2";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { GoDotFill } from "react-icons/go";
Chart.register(CategoryScale);

const data = {
  labels: [
    "Food & Drinks",
    "Medicines",
    "Grocery",
    "Shopping",
    "Salary",
    "Others",
  ],
  datasets: [
    {
      label: "Expense",
      data: [8, 7, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div
      className={`h-[calc(100vh-120px)] overflow-y-scroll w-full text-[17px] text-white
    flex flex-col justify-start items-center gap-2 bg-transparent`}
    >
      <div className={`w-full grid grid-cols-3 gap-4`}>
        <div
          className={`h-[150px] w-full p-4 flex flex-col justify-center items-start gap-4 rounded-md bg-slate-900`}
        >
          <div className={`flex justify-start items-center gap-1`}>
            <GoDotFill className={`text-green-400 text-xl`} />
            <p className={`text-slate-400`}>Credit</p>
          </div>
          <p className={`text-green-400`}>₹ 1500</p>
        </div>

        <div
          className={`h-[150px] w-full p-4 flex flex-col justify-center items-start gap-4 rounded-md bg-slate-900`}
        >
          <div className={`flex justify-start items-center gap-1`}>
            <GoDotFill className={`text-red-400 text-xl`} />
            <p className={`text-slate-400`}>Spends</p>
          </div>
          <p className={`text-red-400`}>₹ 2000</p>
        </div>

        <div
          className={`h-[150px] w-full p-4 flex flex-col justify-center items-start gap-4 rounded-md bg-slate-900`}
        >
          <div className={`flex justify-start items-center gap-1`}>
            <GoDotFill className={`text-orange-400 text-xl`} />
            <p className={`text-slate-400`}>Investments</p>
          </div>
          <p className={`text-orange-400`}>₹ 2500</p>
        </div>
      </div>

      <div
        className={`h-full w-full flex justify-center items-center p-4 rounded-md bg-slate-900`}
      >
        <Pie
          data={data}
          width={400}
          height={200}
          options={{
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  padding: 30,
                  boxPadding: 20,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
