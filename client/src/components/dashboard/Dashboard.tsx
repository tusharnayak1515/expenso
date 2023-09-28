"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { GoDotFill } from "react-icons/go";
import { fetchMyExpenses } from "@/apiCalls/expense";
import { actionCreators } from "@/redux";
import LoadingSpinner from "../LoadingSpinner";
const AddExpense = dynamic(() => import("@/components/modals/AddExpense"), {
  ssr: false,
});

import { Pie } from "react-chartjs-2";
Chart.register(CategoryScale);

import { IoMdAdd } from "react-icons/io";
import { fetchAllCategories } from "@/apiCalls/category";

const Dashboard = ({ isUpdated, setIsUpdated }: any) => {
  const dispatch: any = useDispatch();
  const { expenses } = useSelector(
    (state: any) => state.expenseReducer,
    shallowEqual
  );

  const [groupedExpenses, setGroupedExpenses]: any = useState([]);
  const [activeExpenseType, setActiveExpenseType]: any = useState("all");
  const date = new Date();
  const [activeDate, setActiveDate]: any = useState(
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`
  );
  const [isLoading, setIsLoading]: any = useState(false);
  const [creditAmount, setCreditAmount]: any = useState(0);
  const [spendAmount, setSpendAmount]: any = useState(0);
  const [investmentAmount, setInvestmentAmount]: any = useState(0);
  const [isAddExpense, setIsAddExpense] = useState(false);
  const [legendPosition, setLegendPosition]: any = useState("right");

  const handleExpenseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setActiveExpenseType(e.target.value);
    if (e.target.value === "all") {
      fetchExpenses(null, null, null);
    } else {
      if (e.target.value === "credit") {
        setCreditAmount(0);
      } else if (e.target.value === "debit") {
        setSpendAmount(0);
      } else if (e.target.value === "investment") {
        setInvestmentAmount(0);
      }
      fetchExpenses(null, null, e.target.value);
    }
  };

  const getAllCategories = async () => {
    try {
      const res: any = await fetchAllCategories();
      if (res.success) {
        dispatch(actionCreators.setAllCategories(res.categories));
      }
    } catch (error: any) {
      console.log(
        "Error in credits page, get all categories: ",
        error.response.data.error
      );
    }
  };

  const fetchExpenses = async (year: any, month: any, expenseType: any) => {
    setIsLoading(true);
    setCreditAmount(0);
    setSpendAmount(0);
    setInvestmentAmount(0);
    try {
      const date = new Date();
      const res: any = await fetchMyExpenses({
        year: year || date.getFullYear(),
        month: month || date.getMonth() + 1,
        expenseType,
      });

      console.log("res: ", res);

      if (res.success) {
        dispatch(actionCreators.setAllExpenses(res.expenses));
        let updatedGroupedExpenses: any = [];
        res.expenses.forEach((expense: any) => {
          const categoryName = expense.category.name;
          const expenseType = expense.expenseType;

          const isExpense = updatedGroupedExpenses.some(
            (item: any) => item?.category === categoryName
          );
          const expObj = updatedGroupedExpenses.filter(
            (item: any) => item?.category === categoryName
          );

          if (!isExpense) {
            updatedGroupedExpenses = [
              ...updatedGroupedExpenses,
              { category: categoryName, total: expense?.amount },
            ];
          } else {
            updatedGroupedExpenses = updatedGroupedExpenses?.map((exp: any) =>
              exp?.category === categoryName
                ? {
                    category: categoryName,
                    total: expObj[0].total + expense?.amount,
                  }
                : exp
            );
          }

          if (expenseType === "credit") {
            setCreditAmount((prev: number) => prev + expense.amount);
          } else if (expenseType === "debit") {
            setSpendAmount((prev: number) => prev + expense.amount);
          } else if (expenseType === "investment") {
            setInvestmentAmount((prev: number) => prev + expense.amount);
          }
        });
        console.log("updatedGroupedExpenses: ", updatedGroupedExpenses);
        setGroupedExpenses(updatedGroupedExpenses);
        setIsLoading(false);
        if (isUpdated) {
          setIsUpdated(false);
        }
      }
    } catch (error: any) {
      console.log(
        "Error in dashboard component, fetchExpenses: ",
        error.response.data.error
      );
      setIsLoading(false);
    }
  };

  const data = {
    labels: [...groupedExpenses?.map((expense: any) => expense?.category)],
    datasets: [
      {
        label: "Amount",
        data: [...groupedExpenses?.map((expense: any) => expense?.total)],
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
    setIsLoading(true);
    fetchExpenses(null, null, null);
    getAllCategories();
    const handleResize = () => {
      if (window.innerWidth < 980) {
        setLegendPosition("bottom");
      } else {
        setLegendPosition("right");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isUpdated]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div
        className={`h-full md_link:h-[calc(100vh-120px)] overflow-y-hidden md_link:overflow-y-scroll w-full text-[17px] text-white
      flex flex-col justify-start items-center gap-2 bg-transparent`}
      >
        <div
          className={`w-full flex justify-start items-center flex-wrap gap-4`}
        >
          <button
            className={`self-start py-2 px-4 
            flex justify-start items-center gap-2 
            text-slate-400 border border-slate-400 rounded-md 
            hover:bg-slate-950 bg-slate-900 transition-all duration-300`}
            onClick={() => setIsAddExpense(true)}
          >
            <IoMdAdd /> Add Expense
          </button>

          <select
            name="expenseType"
            value={activeExpenseType}
            onChange={handleExpenseTypeChange}
            className={`py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          >
            <option value="all">All</option>
            {["credit", "debit", "investment"]?.map(
              (expenseType: string, index: number) => {
                return (
                  <option key={index} value={expenseType}>
                    {expenseType}
                  </option>
                );
              }
            )}
          </select>

          <input
            type="month"
            name="datePicker"
            id="datePicker"
            defaultValue={activeDate}
            onChange={(e) => {
              e.preventDefault();
              const year = e.target.value.split("-")[0];
              console.log("year: ", year);
              const month = e.target.value.split("-")[1];
              console.log("month: ", month);
              console.log(e.target.value);
              fetchExpenses(year, month, activeExpenseType);
            }}
            className={`py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        {isAddExpense && (
          <AddExpense
            setIsAddExpense={setIsAddExpense}
            setIsUpdated={setIsUpdated}
          />
        )}
        <div
          className={`w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4`}
        >
          <div
            className={`h-[100px] sm:h-[120px] md:h-[130px] w-full p-4 flex flex-col justify-center items-start gap-4 rounded-md bg-slate-900`}
          >
            <div className={`flex justify-start items-center gap-1`}>
              <GoDotFill className={`text-green-400 text-xl`} />
              <p className={`text-slate-400`}>Credit</p>
            </div>
            <p className={`text-green-400`}>₹ {creditAmount}</p>
          </div>

          <div
            className={`h-[100px] sm:h-[120px] md:h-[130px] w-full p-4 flex flex-col justify-center items-start gap-4 rounded-md bg-slate-900`}
          >
            <div className={`flex justify-start items-center gap-1`}>
              <GoDotFill className={`text-red-400 text-xl`} />
              <p className={`text-slate-400`}>Spends</p>
            </div>
            <p className={`text-red-400`}>₹ {spendAmount}</p>
          </div>

          <div
            className={`h-[100px] sm:h-[120px] md:h-[130px] w-full p-4 flex flex-col justify-center items-start gap-4 rounded-md bg-slate-900`}
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
          {expenses?.length === 0 ? (
            <p>No expense to show</p>
          ) : (
            <Pie
              data={data}
              width={400}
              height={200}
              options={{
                maintainAspectRatio: true,
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
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
