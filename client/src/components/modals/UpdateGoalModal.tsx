"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import { actionCreators } from "@/redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateGoal } from "@/apiCalls/goal";

const UpdateGoalModal = ({ goal, setGoal, setLoading }: any) => {
  const dispatch: any = useDispatch();

  const initGoalData: any = {
    id: goal?._id,
    goal: goal?.goal,
    amount: goal?.amount,
    status: goal?.status,
    completedDate: goal?.completedDate ? goal?.completedDate : null,
  };

  const [goalData, setGoalData] = useState(initGoalData);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "completedDate") {
      setGoalData({ ...goalData, completedDate: new Date(value) });
    } else if (name === "status") {
      if (value === "pending") {
        setGoalData({
          ...goalData,
          status: value,
          completedDate: null,
        });
      } else {
        setGoalData({ ...goalData, status: value });
      }
    } else {
      setGoalData({ ...goalData, [name]: value });
    }
  };

  const onUpdateGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { goal, amount, status, completedDate } = goalData;
      if (
        Number(amount.toString()) > 0 &&
        goal.replace("/s/g", "").trim().length !== 0 &&
        ["pending", "completed"].indexOf(status) !== -1 &&
        (new Date(completedDate) instanceof Date || !completedDate)
      ) {
        const res: any = await updateGoal(goalData);
        if (res.success) {
          dispatch(actionCreators.setMyGoals(res.goals));
          setLoading(false);
          toast.success("Goal updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setGoalData(initGoalData);
          setGoal(null);
        }
      } else if (goal.replace("/s/g", "").trim().length === 0) {
        setLoading(false);
        toast.error("Goal cannot be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      } else if (["pending", "completed"].indexOf(status) === -1) {
        setLoading(false);
        toast.error("Invalid status", {
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
        toast.error("Invalid completion date", {
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
      toast.error(error.response.data.error, {
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
        onSubmit={onUpdateGoal}
      >
        <h1 className={`text-2xl font-bold`}>Update Goal</h1>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="goal">Goal</label>
          <input
            type="text"
            name="goal"
            id="goal"
            placeholder="Goal"
            value={goalData.goal}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="1000"
            value={goalData.amount}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={goalData?.status}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          >
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="completedDate">Completion date</label>
          <input
            type="date"
            name="completedDate"
            id="completedDate"
            value={
              goalData?.completedDate
                ? new Date(goalData?.completedDate).toISOString().slice(0, 10)
                : ``
            }
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-900 
          bg-slate-950 transition-all duration-300`}
        >
          Update
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-950 
          bg-slate-900 transition-all duration-300`}
          onClick={() => setGoal(null)}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  );
};

export default UpdateGoalModal;
