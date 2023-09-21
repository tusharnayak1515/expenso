"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchAllCategories } from "@/apiCalls/category";
import { actionCreators } from "@/redux";
import { fetchMyExpenses } from "@/apiCalls/expense";

const AddExpense = dynamic(() => import("@/components/expenses/AddExpense"), {
  ssr: false,
});

const CreditsPage = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const { expenses } = useSelector(
    (state: any) => state.expenseReducer,
    shallowEqual
  );

  const getAllCategories = async () => {
    try {
      const res: any = await fetchAllCategories();
      if (res.success) {
        dispatch(actionCreators.setAllCategories(res.categories));
      }
    } catch (error: any) {
      console.log(
        "Error in credits page, get all categories: ",
        error.response.data.error
      );
    }
  };

  const fetchExpenses = async () => {
    try {
      const date = new Date();
      const res: any = await fetchMyExpenses({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      });
      if (res.success) {
        dispatch(actionCreators.setAllExpenses(res.expenses));
      }
    } catch (error: any) {
      console.log(
        "Error in dashboard component, fetchExpenses: ",
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    } else {
      getAllCategories();
      fetchExpenses();
    }
  }, [user, router]);

  return (
    <div
      className={`col-span-12 flex flex-col justify-start items-center gap-8`}
    >

      <div
        className={`w-[100%] xxs:w-[400px] xs:w-[500px] md:w-[600px] p-6 
        flex flex-col justify-start items-center gap-4 
        text-slate-400 rounded-md shadow-md shadow-slate-500 bg-slate-900`}
      >
        {expenses?.length === 0 ? (
          <p>No Expenses to show</p>
        ) : (
          <>
            <h1 className={`text-2xl font-bold`}>Credits</h1>
            <div
              className={`w-full py-2 px-4 grid grid-cols-3 `}
            >
              <p className={`text-center font-semibold`}>Category</p>
              <p className={`text-center font-semibold`}>Amount</p>
              <p className={`text-center font-semibold`}>Date</p>
            </div>
            {expenses?.map((expense: any) => {
              if (expense?.expenseType === "credit") {
                const date = new Date(expense?.createdAt);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return (
                  <div
                    key={expense?._id}
                    className={`w-full py-[0.2rem] px-4 grid grid-cols-3`}
                  >
                    <p className={`text-center`}>{expense?.category?.name}</p>
                    <p
                      className={`${
                        expense?.expenseType === "credit"
                          ? "text-green-600"
                          : expense?.expenseType === "debit"
                          ? "text-red-600"
                          : "text-orage-600"
                      } text-center`}
                    >
                      ₹ {expense?.amount}
                    </p>
                    <p className={`text-center`}>
                      {`${day}/${month}/${year}`}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CreditsPage;
