"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import { addExpense } from "@/apiCalls/expense";
import { actionCreators } from "@/redux";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";

const AddExpense = ({ setIsAddExpense, setIsUpdated, activeDate }: any) => {
  const dispatch: any = useDispatch();
  const { categories } = useSelector(
    (state: any) => state.expenseReducer,
    shallowEqual
  );

  const expenseTypes = ["credit", "debit", "investment"];

  const initExpenseData: any = {
    amount: "",
    categoryId: categories[0]?._id || 0,
    expenseType: "credit",
    comment: "",
    expenseDate: new Date(),
  };

  const [expenseData, setExpenseData] = useState(initExpenseData);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "expenseDate") {
      setExpenseData({ ...expenseData, expenseDate: new Date(value) });
    } else {
      setExpenseData({ ...expenseData, [name]: value });
    }
  };

  const onAddExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { amount, categoryId, expenseType, expenseDate } = expenseData;
      if (
        Number(amount.toString()) > 0 &&
        categoryId !== null &&
        ["credit", "debit", "investment"].indexOf(expenseType) !== -1 &&
        expenseDate instanceof Date
      ) {
        const year = activeDate.split("-")[0];
        const month = activeDate.split("-")[1];
        const res: any = await addExpense({
          ...expenseData,
          year,
          month
        });
        if (res.success) {
          // dispatch(actionCreators.addExpense(res.expenses));
          toast.success("Expense added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setExpenseData(initExpenseData);
          setIsAddExpense(false);
          setIsUpdated((prev:boolean)=> !prev);
        }
      } else if (Number(amount.toString()) <= 0) {
        toast.error("Amount must be greater than 0", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (categoryId === null) {
        toast.error("Category cannot be null", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!(expenseDate instanceof Date)) {
        toast.error("Invalid date", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return ReactDom.createPortal(
    <div className={`fixed inset-0 bg-[#0000005f] z-[600]`}>
      <form
        className={`w-[95%] xxs:w-[400px] xs:w-[450px] md:w-[500px] my-24 mx-auto text-slate-400
        p-6 flex flex-col justify-start items-center 
        gap-4 rounded-md shadow-md shadow-slate-500 bg-slate-950`}
        onSubmit={onAddExpense}
      >
        <h1 className={`text-2xl font-bold`}>Add Expense</h1>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="1000"
            value={expenseData.amount}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="expenseType">Expense Type</label>
          <select
            name="expenseType"
            id="expenseType"
            value={expenseData.expenseType}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          >
            {expenseTypes?.map((expenseType: any, index: number) => {
              return (
                <option key={index} value={expenseType}>
                  {expenseType}
                </option>
              );
            })}
          </select>
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="categoryId">Category</label>
          <select
            name="categoryId"
            id="categoryId"
            value={expenseData.categoryId}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          >
            {categories?.map((category: any) => {
              return (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              );
            })}
          </select>
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Sent to Amit"
            value={expenseData.comment}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="expenseDate">Expense Date</label>
          <input
            type="date"
            name="expenseDate"
            id="expenseDate"
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-900 
          bg-slate-950 transition-all duration-300`}
        >
          Add Expense
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-950 
          bg-slate-900 transition-all duration-300`}
          onClick={() => setIsAddExpense(false)}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  );
};

export default AddExpense;
