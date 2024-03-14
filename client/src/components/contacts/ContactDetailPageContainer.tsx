"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchContact } from "@/apiCalls/contact";
import LoadingSpinner from "../LoadingSpinner";
import { actionCreators } from "@/redux";
import { IoMdAdd } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { fetchTransactions } from "@/apiCalls/creditTransaction";
import Transaction from "../transactions/Transaction";
import ManageTransactionModal from "../modals/ManageTransactionModal";

const ContactDetailPageContainer = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const { contact } = useSelector(
    (state: any) => state.contactReducer,
    shallowEqual
  );
  const { transactions } = useSelector(
    (state: any) => state.transactionReducer,
    shallowEqual
  );

  const [isAddTransaction, setIsAddTransaction] = useState(false);
  const [transaction, setTransaction]: any = useState(null);
  const date = new Date();
  const [activeDate, setActiveDate]: any = useState(
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`
  );
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setIsAddTransaction((prev: boolean) => !prev);
  };

  const getContact = useCallback(async () => {
    setIsLoading(true);
    try {
      const contactId: any = params?.id;
      const res: any = await fetchContact(contactId);
      if (res?.success) {
        dispatch(actionCreators.setContact(res?.contact));
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(
        `Error in fetching contact details in contact details page: `,
        error
      );
      setIsLoading(false);
    }
  }, [dispatch, params?.id]);

  const getTransactions = useCallback(
    async (month: any, year: any) => {
      setIsLoading(true);
      try {
        const contactId: any = params?.id;
        const res: any = await fetchTransactions({ contactId, month, year });
        if (res?.success) {
          dispatch(actionCreators.setTransactions(res?.creditTransactions));
          setIsLoading(false);
        }
      } catch (error: any) {
        console.log(
          `Error in fetching contact details in contact details page: `,
          error
        );
        setIsLoading(false);
      }
    },
    [dispatch, params?.id]
  );

  const downloadExcel = () => {};

  useEffect(() => {
    if (!user) {
      router?.replace("/signin");
    } else {
      getContact();
      const year = activeDate.split("-")[0];
      const month = activeDate.split("-")[1];
      getTransactions(month, year);
    }
  }, [user, router, getContact, activeDate, getTransactions]);

  return (
    <div
      className={`h-full md_link:h-[calc(100vh-120px)] col-span-12 overflow-y-hidden md_link:overflow-y-scroll 
      text-slate-400 flex flex-col justify-start items-start gap-2`}
    >
      {isLoading && <LoadingSpinner />}

      {(isAddTransaction || transaction) && (
        <ManageTransactionModal
          transaction={transaction}
          setTransaction={setTransaction}
          setLoading={setIsLoading}
          toggleModal={toggleModal}
          month={activeDate.split("-")[1]}
          year={activeDate.split("-")[0]}
        />
      )}

      <div className={`w-full`}>
        <p className={`text-2xl text-slate-300 font-semibold`}>
          {contact?.name}
        </p>

        <div
          className={`w-full my-2 flex justify-start items-center flex-wrap gap-4`}
        >
          <button
            className={`self-start py-2 px-4 
              flex justify-start items-center gap-2 
              text-slate-400 border border-slate-400 rounded-md 
              hover:bg-slate-950 bg-slate-900 transition-all duration-300`}
            onClick={() => setIsAddTransaction(true)}
          >
            <IoMdAdd /> Add Transaction
          </button>

          <input
            type="month"
            name="datePicker"
            id="datePicker"
            defaultValue={activeDate}
            onChange={(e) => {
              e.preventDefault();
              const year = e.target.value.split("-")[0];
              const month = e.target.value.split("-")[1];
              setActiveDate(`${year}-${month.toString().padStart(2, "0")}`);
            }}
            className={`py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />

          <button
            className={`self-start py-2 px-4 
            flex justify-start items-center gap-2 
            text-slate-400 border border-slate-400 rounded-md 
            hover:bg-slate-950 bg-slate-900 transition-all duration-300`}
            onClick={downloadExcel}
          >
            <MdFileDownload /> Download report
          </button>
        </div>
      </div>

      <div className={`h-full w-full grid grid-cols-12 gap-4`}>
        <div
          className={`h-full col-span-12 md_link:col-span-9 p-6 text-slate-400 
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
                className={`w-full py-2 px-4 flex justify-between items-center gap-6 rounded-md bg-slate-600`}
              >
                <p className={`w-[10%] font-bold`}>Amount</p>
                <p className={`w-[30%] font-bold`}>Date</p>
                <p className={`w-[20%] font-bold`}>Comment</p>
                <p className={`w-[10%] font-bold`}>Paid</p>
                <p className={`w-[30%] font-bold`}>Payment Date</p>
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
            </div>
          )}
        </div>

        <div
          className={`h-full col-span-12 md_link:col-span-3 p-6 text-slate-400 
          flex flex-col justify-start items-start gap-4 overflow-y-hidden md_link:overflow-y-scroll
          rounded-md bg-slate-900`}
        ></div>
      </div>
    </div>
  );
};

export default ContactDetailPageContainer;
