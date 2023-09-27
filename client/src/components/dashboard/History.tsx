"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useSelector, shallowEqual } from "react-redux";

const ViewExpense = dynamic(()=> import("../modals/ViewExpense"), {ssr: false});

import { MdOutlineHistory } from "react-icons/md";

const History = ({setIsUpdated}:any) => {
  const { expenses } = useSelector(
    (state: any) => state.expenseReducer,
    shallowEqual
  );

  const [expense, setExpense] = useState(null);

  return (
    <>
      {expense && <ViewExpense expense={expense} setExpense={setExpense} setIsUpdated={setIsUpdated} />}
      <div
        className={`h-auto md_link:h-[calc(100vh-120px)] overflow-y-scroll w-full text-[17px] text-slate-400 
    flex flex-col justify-start items-center rounded-md bg-slate-900`}
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
                className={`w-full py-4 px-6 flex justify-between items-center 
                border-b border-slate-400 cursor-pointer 
                hover:bg-slate-950 bg-slate-900`}
                onClick={()=> setExpense(expense)}
              >

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

                <p>{new Date(expense?.expenseDate).toLocaleDateString()}</p>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default History;
