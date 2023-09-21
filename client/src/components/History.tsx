"use client";

import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { MdOutlineHistory, MdFoodBank, MdShoppingCart } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

const History = () => {
  const { expenses } = useSelector(
    (state: any) => state.expenseReducer,
    shallowEqual
  );

  return (
    <div
      className={`h-[calc(100vh-120px)] overflow-y-scroll w-full text-[17px] text-slate-400 
    flex flex-col justify-start items-center gap-2 rounded-md bg-slate-900`}
    >
      <div
        className={`w-full p-4 flex justify-center items-center gap-2 border-b border-slate-400`}
      >
        <MdOutlineHistory className={`text-2xl`} />
        <p>Your Expense History</p>
      </div>

      {expenses?.length === 0 ? (
        <p>No expenses to show</p>
      ) : (
        expenses?.map((expense: any) => {
          return (
            <div
              key={expense?._id}
              className={`w-full py-4 px-6 flex justify-between items-center border-b border-slate-400`}
            >
              <div className={`flex justify-start items-center gap-2`}>
                <MdFoodBank className={`text-2xl`} />
                <p>{expense?.category?.name}</p>
              </div>

              <p
                className={`${
                  expense?.expenseType === "credit"
                    ? "text-green-600"
                    : expense?.expenseType === "debit"
                    ? "text-red-600"
                    : "text-orange-600"
                } font-semibold`}
              >
                ₹ {expense?.amount}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default History;
