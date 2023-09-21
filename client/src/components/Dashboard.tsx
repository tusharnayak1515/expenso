"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Pie } from "react-chartjs-2";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { GoDotFill } from "react-icons/go";
import { fetchMyExpenses } from "@/apiCalls/expense";
import { actionCreators } from "@/redux";
import LoadingSpinner from "./LoadingSpinner";
Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch: any = useDispatch();
  const { expenses } = useSelector(
    (state: any) => state.expenseReducer,
    shallowEqual
  );

  const [isLoading, setIsLoading]: any = useState(false);
  const [amounts, setAmounts]: any = useState([]);
  const [creditAmount, setCreditAmount]: any = useState(0);
  const [spendAmount, setSpendAmount]: any = useState(0);
  const [investmentAmount, setInvestmentAmount]: any = useState(0);
  const [labels, setLabels]: any = useState([]);

  const fetchExpenses = async () => {
    try {
      const date = new Date();
      const res: any = await fetchMyExpenses({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      });
      if (res.success) {
        console.log("res: ", res);
        dispatch(actionCreators.setAllExpenses(res.expenses));
        const updatedGroupedExpenses: any = {};

        let temp: number[] = [...amounts];
        let temp2: string[] = [...labels];
        expenses.forEach((expense: any) => {
          console.log("expense: ",expense);
          const categoryName = expense.category.name;
          const expenseType = expense.expenseType;

          if (!temp2.includes(categoryName)) {
            temp2.push(categoryName);
          }

          if (!updatedGroupedExpenses[categoryName]) {
            updatedGroupedExpenses[categoryName] = [];
          }

          if (expenseType === "credit") {
            setCreditAmount((prev:number)=> prev + expense.amount);
          } else if (expenseType === "debit") {
            setSpendAmount((prev:number)=> prev + expense.amount);
          } else if (expenseType === "investment") {
            setInvestmentAmount((prev:number)=> prev + expense.amount);
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

        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(
        "Error in dashboard component, fetchExpenses: ",
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchExpenses();
  }, [expenses?.length]);

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

  return (
    <>
      {isLoading && <LoadingSpinner />}
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
            <p className={`text-green-400`}>₹ {creditAmount}</p>
          </div>

          <div
            className={`h-[150px] w-full p-4 flex flex-col justify-center items-start gap-4 rounded-md bg-slate-900`}
          >
            <div className={`flex justify-start items-center gap-1`}>
              <GoDotFill className={`text-red-400 text-xl`} />
              <p className={`text-slate-400`}>Spends</p>
            </div>
            <p className={`text-red-400`}>₹ {spendAmount}</p>
          </div>

          <div
            className={`h-[150px] w-full p-4 flex flex-col justify-center items-start gap-4 rounded-md bg-slate-900`}
          >
            <div className={`flex justify-start items-center gap-1`}>
              <GoDotFill className={`text-orange-400 text-xl`} />
              <p className={`text-slate-400`}>Investments</p>
            </div>
            <p className={`text-orange-400`}>₹ {investmentAmount}</p>
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
    </>
  );
};

export default Dashboard;
