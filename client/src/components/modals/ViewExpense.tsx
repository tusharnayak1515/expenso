"use client";

import { deleteExpense, updateExpense } from "@/apiCalls/expense";
import { actionCreators } from "@/redux";
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ViewExpense = ({
  expense,
  setExpense,
  setIsUpdated,
  activeDate,
}: any) => {
  const dispatch: any = useDispatch();
  const { categories } = useSelector(
    (state: any) => state.expenseReducer,
    shallowEqual
  );

  const expenseTypes = ["credit", "debit", "investment"];
  const initExpenseData: any = {
    expenseId: expense?._id,
    amount: expense?.amount,
    categoryId: expense?.category?._id,
    expenseType: expense?.expenseType,
    comment: expense?.comment || "",
    expenseDate: new Date(expense?.expenseDate).toISOString().slice(0, 10),
  };

  const [expenseData, setExpenseData] = useState(initExpenseData);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "expenseDate") {
      console.log("event: ", new Date(value));
      setExpenseData({ ...expenseData, expenseDate: new Date(value) });
    } else {
      setExpenseData({ ...expenseData, [name]: value });
    }
  };

  const onUpdateExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("activeDate: ", new Date(activeDate).getMonth()+1);
    try {
      const { amount, categoryId, expenseType, expenseDate } = expenseData;
      console.log("activeDate 2: ", new Date(expenseDate).getMonth() + 1);
      if (
        Number(amount.toString()) > 0 &&
        categoryId !== null &&
        ["credit", "debit", "investment"].indexOf(expenseType) !== -1 &&
        new Date(expenseDate) instanceof Date
      ) {
        const res: any = await updateExpense({
          ...expenseData,
          amount: Number(amount),
          expenseDate: new Date(expenseDate),
          month: new Date(expenseDate).getMonth() + 1,
          year: new Date(expenseDate).getFullYear(),
        });
        if (res.success) {
          console.log("expenseData: ", expenseData);
          // dispatch(actionCreators.updateExpense(res.expenses));
          toast.success("Expense updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setExpenseData(initExpenseData);
          setExpense(null);
          setIsUpdated(true);
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
      console.log("error: ", error);
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

  const onDeleteExpense = async () => {
    try {
      console.log(expenseData?.expenseId);
      if (!expenseData?.expenseId) {
        toast.error("Invalid expense", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const res: any = await deleteExpense({
          expenseId: expenseData?.expenseId,
          month: new Date(expenseData?.expenseDate).getMonth() + 1,
          year: new Date(expenseData?.expenseDate).getFullYear(),
        });
        if (res.success) {
          // dispatch(actionCreators.deleteExpense(res.expenses));
          toast.success("Expense deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setExpense(null);
          setIsUpdated(true);
        }
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

  useEffect(() => {
    if (expense?._id) {
      console.log("expenseDate 1: ", new Date(expense?.expenseDate));
      console.log("expense: ", expense);
      setExpenseData({
        expenseId: expense?._id,
        amount: expense?.amount,
        categoryId: expense?.category?._id,
        expenseType: expense?.expenseType,
        comment: expense?.comment || "",
        expenseDate: new Date(expense?.expenseDate).toISOString().slice(0, 10),
      });

      if (expenseData?.expenseId) {
        console.log("expenseData: ", expenseData);
      }
    }
  }, [expense?._id]);

  return ReactDom.createPortal(
    <div className={`fixed inset-0 bg-[#0000005f] z-[600]`}>
      <form
        className={`h-[85vh] md_link:h-auto w-[100%] xxs:w-[400px] xs:w-[450px] md:w-[500px] 
        my-8 mx-auto text-slate-400 overflow-y-scroll md_link:overflow-y-hidden
        p-6 flex flex-col justify-start items-center 
        gap-4 rounded-md shadow-inner shadow-slate-500 bg-slate-950`}
        onSubmit={onUpdateExpense}
      >
        <h1 className={`text-2xl font-bold`}>Update Expense</h1>

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
            defaultValue={expenseData.categoryId}
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
            defaultValue={expenseData?.expenseDate}
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
          Update
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-red-500 
          bg-red-600 transition-all duration-300`}
          onClick={onDeleteExpense}
        >
          Delete
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-950 
          bg-slate-900 transition-all duration-300`}
          onClick={() => setExpense(null)}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  );
};

export default ViewExpense;
