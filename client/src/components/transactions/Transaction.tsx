"use client";

import React from "react";

const Transaction = ({ transaction, setTransaction }: any) => {
  return (
    <div
      onClick={() => setTransaction(transaction)}
      className={`w-full py-2 px-4 flex justify-between items-start gap-6 rounded-md cursor-pointer bg-slate-600`}
    >
      <p className={`w-[10%] text-sm md_link:text-base font-semibold`}>
        ₹{transaction?.amount}
      </p>
      <p className={`w-[30%] text-sm md_link:text-base font-semibold`}>
        {new Date(transaction?.date).toISOString().slice(0, 10)}
      </p>
      <p className={`w-[20%] text-sm md_link:text-base break-all font-[500]`}>
        {transaction?.comment}
      </p>
      <p className={`w-[10%] text-sm md_link:text-base font-semibold`}>
        {transaction?.paymentStatus === "paid" ? "Yes" : "No"}
      </p>
      <p className={`w-[30%] text-sm md_link:text-base font-semibold`}>
        {transaction?.paymentStatus === "paid"
          ? new Date(transaction?.paymentDate).toISOString().slice(0, 10)
          : "N/A"}
      </p>
    </div>
  );
};

export default Transaction;
