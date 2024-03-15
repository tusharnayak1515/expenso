"use client";

import React from "react";
import Transaction from "./Transaction";

const Transactions = ({ transactions, setTransaction }: any) => {
  return (
    <div
      className={`h-full col-span-12 md_link:col-span-8 p-6 text-slate-400 
  flex flex-col justify-start items-start gap-4
  rounded-md bg-slate-900`}
    >
      {transactions?.length === 0 ? (
        <p>No transactions to show</p>
      ) : (
        <div
          className={`h-full w-full flex flex-col justify-start items-start gap-3`}
        >
          <div
            className={`w-full py-2 px-4 hidden base:flex justify-between items-center gap-6 rounded-md bg-slate-600`}
          >
            <p className={`w-[30%] font-bold`}>Amount</p>
            <p className={`w-[40%] font-bold`}>Date</p>
            <p className={`w-[30%] font-bold`}>Paid</p>
          </div>
          {transactions?.map((transactionObj: any) => {
            return (
              <Transaction
                key={transactionObj?._id}
                transaction={transactionObj}
                setTransaction={setTransaction}
              />
            );
          })}

          <div
            className={`w-full flex base:hidden flex-col justify-start items-start gap-2`}
          >
            {transactions?.map((transactionObj: any) => {
              return (
                <div
                  key={transactionObj?._id}
                  onClick={() => setTransaction(transactionObj)}
                  className={`w-full py-4 flex justify-between items-center border-b border-slate-400`}
                >
                  <p className={`text-red-600 font-semibold`}>
                    ₹{transactionObj?.amount}
                  </p>
                  <p className={`text-slate-400 font-semibold`}>
                    {new Date(transactionObj?.date).toISOString().slice(0, 10)}
                  </p>
                  <p
                    className={`${
                      transactionObj?.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-orange-600"
                    } font-semibold`}
                  >
                    {transactionObj?.paymentStatus}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
