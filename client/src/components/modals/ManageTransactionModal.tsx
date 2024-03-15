"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import { actionCreators } from "@/redux";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addContact, updateContact } from "@/apiCalls/contact";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/apiCalls/creditTransaction";

const ManageTransactionModal = ({
  transaction,
  setTransaction,
  setLoading,
  toggleModal,
  month,
  year,
}: any) => {
  const dispatch: any = useDispatch();
  const { contact } = useSelector(
    (state: any) => state.contactReducer,
    shallowEqual
  );

  const initTransactionData: any = {
    id: transaction?._id || null,
    amount: transaction?.amount || "",
    date: transaction?.date
      ? new Date(transaction?.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    comment: transaction?.comment || "",
    paymentStatus: transaction?.paymentStatus || "pending",
    paymentDate: transaction?.paymentDate
      ? new Date(transaction?.paymentDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  };

  const [transactionData, setTransactionData] = useState(initTransactionData);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (["date", "paymentDate"].includes(name)) {
      setTransactionData((prev: any) => {
        return {
          ...prev,
          [name]: new Date(value),
        };
      });
    } else {
      setTransactionData((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const onAddTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { amount, date, comment } = transactionData;
      console.log("date: ", date);
      if (Number(amount.toString()) > 0 && new Date(date) instanceof Date) {
        const res: any = await addTransaction({
          contactId: contact?._id,
          amount: Number(amount),
          date: new Date(date).toISOString().slice(0, 10),
          comment,
          month,
          year,
        });
        if (res?.success) {
          dispatch(actionCreators.setTransactions(res?.creditTransactions));
          setLoading(false);
          toast.success("Transaction added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTransactionData(initTransactionData);
          toggleModal();
        }
      } else if (Number(amount.toString()) <= 0) {
        setLoading(false);
        toast.error("Amount must be greater than 0", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setLoading(false);
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
      setLoading(false);
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

  const onUpdateTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { amount, date, comment, paymentStatus, paymentDate } =
        transactionData;
      if (
        Number(amount.toString()) > 0 &&
        new Date(date) instanceof Date &&
        ["pending", "paid"].includes(paymentStatus) &&
        new Date(paymentDate) instanceof Date
      ) {
        const res: any = await updateTransaction({
          id: transaction?._id,
          amount: Number(amount),
          date: new Date(date).toISOString().slice(0, 10),
          comment,
          paymentStatus,
          paymentDate: new Date(paymentDate).toISOString().slice(0, 10),
          month,
          year,
        });
        if (res?.success) {
          dispatch(actionCreators.setTransactions(res?.creditTransactions));
          setLoading(false);
          toast.success("Transaction updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTransactionData(initTransactionData);
          setTransaction(null);
        }
      } else if (Number(amount.toString()) <= 0) {
        setLoading(false);
        toast.error("Amount must be greater than 0", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (new Date(date)! instanceof Date) {
        setLoading(false);
        toast.error("Invalid date", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!["pending", "paid"].includes(paymentStatus)) {
        setLoading(false);
        toast.error("Invalid payment status", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setLoading(false);
        toast.error("Invalid payment date", {
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
      setLoading(false);
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

  const onDeleteTransaction = async () => {
    setLoading(true);
    try {
      const res: any = await deleteTransaction(transaction?._id);
      if (res?.success) {
        dispatch(actionCreators.setTransactions(res?.creditTransactions));
        setLoading(false);
        toast.success("Transaction deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTransaction(null);
      }
    } catch (error: any) {
      setLoading(false);
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

  return ReactDom.createPortal(
    <div className={`fixed inset-0 bg-[#0000005f] z-[600]`}>
      <form
        className={`w-[95%] xxs:w-[400px] xs:w-[450px] md:w-[500px] my-24 mx-auto text-slate-400
        p-6 flex flex-col justify-start items-center 
        gap-4 rounded-md shadow-md shadow-slate-500 bg-slate-950`}
        onSubmit={transaction ? onUpdateTransaction : onAddTransaction}
      >
        <h1 className={`text-2xl font-bold`}>
          {transaction ? "Update Transaction" : "Add Transaction"}
        </h1>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Amount"
            value={transactionData.amount}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={transactionData?.date}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Comment..."
            value={transactionData.comment}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        {transaction && (
          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="paymentStatus">Payment Status</label>
            <select
              name="paymentStatus"
              id="paymentStatus"
              value={transactionData?.paymentStatus}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
            >
              <option value="pending">pending</option>
              <option value="paid">paid</option>
            </select>
          </div>
        )}

        {transaction && transactionData?.paymentStatus === "paid" && (
          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="paymentDate">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              id="paymentDate"
              defaultValue={transactionData?.paymentDate}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-900 
          bg-slate-950 transition-all duration-300`}
        >
          Submit
        </button>

        {transaction && (
          <button
            onClick={onDeleteTransaction}
            type="button"
            className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-red-700 
          bg-red-800 transition-all duration-300`}
          >
            Delete
          </button>
        )}

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-950 
          bg-slate-900 transition-all duration-300`}
          onClick={() => (transaction ? setTransaction(null) : toggleModal())}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  );
};

export default ManageTransactionModal;
