"use client";

import React from "react";

const Transaction = ({ transaction, setTransaction }: any) => {
  return (
    <div
      onClick={() => setTransaction(transaction)}
      className={`w-full py-2 px-4 hidden base:flex justify-between items-start gap-6 rounded-md cursor-pointer bg-slate-600`}
    >
      <p className={`w-[30%] text-sm md_link:text-base font-semibold`}>
        ₹{transaction?.amount}
      </p>
      <p className={`w-[40%] text-sm md_link:text-base font-semibold`}>
        {new Date(transaction?.date).toISOString().slice(0, 10)}
      </p>
      <p className={`w-[30%] text-sm md_link:text-base font-semibold`}>
        {transaction?.paymentStatus === "paid" ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default Transaction;
