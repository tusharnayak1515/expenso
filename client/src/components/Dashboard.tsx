"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { GoDotFill } from "react-icons/go";
Chart.register(CategoryScale);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([
    {
      _id: "6503da729c49c9391001545d",
      amount: 209,
      category: {
        _id: "6503d4c85065a2de0df7df00",
        name: "recharge",
        createdAt: 1694749896178,
        updatedAt: 1694749896178,
      },
      expenseType: "debit",
      comment: "Jio Monthly Recharge",
      expenseDate: "2023-09-15T04:12:28.650Z",
      user: "65032c37866596c125cb76f1",
      createdAt: 1694751346209,
      updatedAt: 1694752817919,
    },
    {
      _id: "6503d9f3de36d913f2b7a328",
      amount: 22300,
      category: {
        _id: "6503d4c85065a2de0df7df0e",
        name: "salary",
        createdAt: 1694749896235,
        updatedAt: 1694749896235,
      },
      expenseType: "credit",
      comment: "Salary for August",
      expenseDate: "2023-09-15T04:12:28.650Z",
      user: "65032c37866596c125cb76f1",
      createdAt: 1694751219530,
      updatedAt: 1694751219530,
    },
    {
      _id: "65040670f20ce8fe29e877a8",
      amount: 1000,
      category: {
        _id: "6503d4c85065a2de0df7df10",
        name: "other",
        createdAt: 1694749896243,
        updatedAt: 1694749896243,
      },
      expenseType: "debit",
      comment: "ATM Withdrawal",
      expenseDate: "2023-09-15T04:12:28.650Z",
      user: "65032c37866596c125cb76f1",
      createdAt: 1694762608481,
      updatedAt: 1694762608481,
    },
  ]);

  const [groupedExpenses, setGroupedExpenses]: any = useState({});
  const [amounts, setAmounts]: any = useState([]);
  const [labels, setLabels]: any = useState([]);

  useEffect(() => {
    const updatedGroupedExpenses: any = {};

    let temp: number[] = [...amounts];
    let temp2: string[] = [...labels];
    expenses.forEach((expense) => {
      const categoryName = expense.category.name;

      if (!temp2.includes(categoryName)) {
        temp2.push(categoryName);
      }

      if (!updatedGroupedExpenses[categoryName]) {
        updatedGroupedExpenses[categoryName] = [];
      }

      updatedGroupedExpenses[categoryName].push(expense);
      let total: number = 0;
      updatedGroupedExpenses[categoryName].forEach((expense: any) => {
        total += expense.amount;
      });
      temp.push(total);
      setAmounts(temp);
      setLabels(temp2);
    });

    setGroupedExpenses(updatedGroupedExpenses);
  }, [expenses]);

  const data = {
    labels: [...labels],
    datasets: [
      {
        label: "Expense",
        data: [...amounts],
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
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    console.log(groupedExpenses);
    console.log(amounts);
  }, [groupedExpenses]);

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
