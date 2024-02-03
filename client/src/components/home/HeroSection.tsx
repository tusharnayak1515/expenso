"use client";

import React, { useEffect, useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
Chart.register(CategoryScale);

const HeroSection = () => {
  const [legendPosition, setLegendPosition]: any = useState("bottom");

  const dummyData = [
    { category: 'Food', total: 200 },
    { category: 'Entertainment', total: 100 },
    { category: 'Utilities', total: 150 },
  ];
  
  const data = {
    labels: dummyData.map(item => item.category),
    datasets: [
      {
        label: 'Amount',
        data: dummyData.map(item => item.total),
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 
                       'rgba(54, 162, 235, 1)',
                       'rgba(255, 206, 86, 1)'],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 980) {
        setLegendPosition("right");
      } else {
        setLegendPosition("bottom");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`min-h-[70vh] w-full text-slate-300 border-t border-b border-slate-400
      grid grid-cols-1 md_link:grid-cols-2 bg-slate-900`}
    >
      <div
        className={`h-full w-full p-16 flex justify-center items-center border-r border-slate-400`}
      >
        <div
          className={`w-[85%] flex flex-col justify-start items-start gap-4`}
        >
          <p className={`text-4xl font-bold`}>
            Manage your expenses easily with Expenso
          </p>

          <p className={`text-slate-400`}>
            We are providing easiest way to manage and track your expenses,
            anytime, and anywhere.
          </p>

          <button
            className={`py-3 px-6 text-slate-200 rounded-sm bg-slate-700 hover:bg-slate-600`}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className={`h-full w-full p-16 flex justify-center items-center`}>
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
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
