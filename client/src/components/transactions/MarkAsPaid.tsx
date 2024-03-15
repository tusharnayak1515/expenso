"use client";

import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions, markAsPaid } from "@/apiCalls/creditTransaction";
import { toast } from "react-toastify";
import { actionCreators } from "@/redux";

const MarkAsPaid = ({ setIsLoading, activeDate }: any) => {
  const dispatch: any = useDispatch();
  const { contact } = useSelector(
    (state: any) => state.contactReducer,
    shallowEqual
  );

  const date = new Date();
  const [fromDate, setFromDate] = useState(date);
  const [toDate, setToDate] = useState(fromDate);
  const [paymentDate, setPaymentDate] = useState(date);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheck, setIsCheck] = useState(false);

  const onFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFromDate(new Date(e.target.value));
  };

  const onToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setToDate(new Date(e.target.value));
  };

  const onPaymentDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPaymentDate(new Date(e.target.value));
  };

  const onCheck = async () => {
    setIsLoading(true);
    setIsCheck(true);
    try {
      const res: any = await fetchAllTransactions(contact?._id);
      if (res?.success) {
        const creditTransactions = res?.creditTransactions;
        const data = creditTransactions?.filter(
          (obj: any) =>
            new Date(obj?.date).getTime() >= new Date(fromDate).getTime() &&
            new Date(obj?.date).getTime() <= new Date(toDate).getTime() &&
            obj?.paymentStatus === "pending"
        );

        const amount = data.reduce((total: any, obj: any) => {
          return total + obj?.amount;
        }, 0);

        setTotalAmount(amount);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(`Error in on Check in mark as paid: `, error);
      setIsLoading(false);
      setIsCheck(false);
    }
  };

  const onMarkAsPaid = async () => {
    try {
      const res: any = await markAsPaid({
        contactId: contact?._id,
        fromDate: new Date(fromDate).toISOString().slice(0, 10),
        toDate: new Date(toDate).toISOString().slice(0, 10),
        paymentDate: new Date(paymentDate).toISOString().slice(0, 10),
        month: activeDate?.split("-")[1],
        year: activeDate?.split("-")[0],
      });

      if (res?.success) {
        dispatch(actionCreators.setTransactions(res?.creditTransactions));
        toast.success("Marked as paid", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
        setIsCheck(false);
        setTotalAmount(0);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error, {
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
    setTotalAmount(0);
    setIsCheck(false);
  }, [fromDate, toDate]);

  return (
    <div
      className={`h-full col-span-12 md_link:col-span-4 p-6 text-slate-400 
      flex flex-col justify-start items-start gap-5 overflow-y-hidden md_link:overflow-y-scroll
      rounded-md bg-slate-900`}
    >
      <div
        className={`w-full flex flex-col xxxs:flex-row md_link:flex-col xl:flex-row 
        justify-start items-start xxxs:items-center md_link:items-start xl:items-center gap-4`}
      >
        <div
          className={`w-full xl:w-[50%] flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="fromDate">From</label>
          <input
            type="date"
            name="fromDate"
            id="fromDate"
            defaultValue={new Date(fromDate).toISOString().split("T")[0]}
            onChange={onFromDateChange}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full xl:w-[50%] flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="toDate">To</label>
          <input
            type="date"
            name="toDate"
            id="toDate"
            defaultValue={new Date(fromDate).toISOString().split("T")[0]}
            min={new Date(fromDate).toISOString().split("T")[0]}
            onChange={onToDateChange}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>
      </div>

      <button
        onClick={onCheck}
        className={`w-full xs:w-[120px] md_link:w-full py-2 px-4 text-slate-200 rounded-sm 
        hover:bg-slate-500 bg-slate-600 transition-all duration-300`}
      >
        Check
      </button>

      {isCheck && totalAmount === 0 ? (
        <p className={`self-center`}>No transactions found</p>
      ) : (
        isCheck && (
          <div
            className={`w-full flex flex-col justify-start items-start gap-3`}
          >
            <p className={`text-green-600 font-semibold`}>
              Total Amount: ₹{totalAmount}
            </p>

            <div
              className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
            >
              <label htmlFor="paymentDate">Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                id="paymentDate"
                defaultValue={new Date(toDate).toISOString().split("T")[0]}
                min={new Date(toDate).toISOString().split("T")[0]}
                onChange={onPaymentDateChange}
                className={`w-full sm:w-fit md_link:w-full py-2 px-4 border border-slate-400 rounded-md 
                outline-none bg-slate-800`}
              />
            </div>

            <button
              onClick={onMarkAsPaid}
              className={`w-full xs:w-[120px] md_link:w-full py-2 px-4 text-slate-200 rounded-sm 
        hover:bg-slate-500 bg-slate-600 transition-all duration-300`}
            >
              Mark as paid
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default MarkAsPaid;
