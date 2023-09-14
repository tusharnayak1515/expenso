"use client";

import React from "react";
import { MdOutlineHistory, MdFoodBank, MdShoppingCart } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

const History = () => {
  return (
    <div
      className={`h-[calc(100vh-120px)] w-full text-[17px] text-slate-400 
    flex flex-col justify-start items-center gap-2 rounded-md bg-slate-900`}
    >
      <div
        className={`w-full p-4 flex justify-center items-center gap-2 border-b border-slate-400`}
      >
        <MdOutlineHistory className={`text-2xl`} />
        <p>Your Transaction History</p>
      </div>

      <div
        className={`w-full py-4 px-6 flex justify-between items-center border-b border-slate-400`}
      >
        <div className={`flex justify-start items-center gap-2`}>
          <MdFoodBank className={`text-2xl`} />
          <p>Burger</p>
        </div>

        <p className={`text-red-600 font-semibold`}>₹ 199</p>
      </div>

      <div
        className={`w-full py-4 px-6 flex justify-between items-center border-b border-slate-400`}
      >
        <div className={`flex justify-start items-center gap-2`}>
          <GiReceiveMoney className={`text-2xl`} />
          <p>Salary</p>
        </div>

        <p className={`text-green-600 font-semibold`}>₹ 16,500</p>
      </div>

      <div
        className={`w-full py-4 px-6 flex justify-between items-center border-b border-slate-400`}
      >
        <div className={`flex justify-start items-center gap-2`}>
          <MdShoppingCart className={`text-2xl`} />
          <p>Shopping</p>
        </div>

        <p className={`text-red-600 font-semibold`}>₹ 500</p>
      </div>
    </div>
  );
};

export default History;
