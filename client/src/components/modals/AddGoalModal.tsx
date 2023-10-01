"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import { actionCreators } from "@/redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addGoal } from "@/apiCalls/goal";

const AddGoalModal = ({setIsAddGoal, setLoading}:any) => {
  const dispatch: any = useDispatch();

  const initGoalData: any = {
    goal: "",
    amount: 1
  };

  const [goalData, setGoalData] = useState(initGoalData);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setGoalData({ ...goalData, [name]: value });
  };

  const onAddGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { goal, amount} = goalData;
      if (
        Number(amount.toString()) > 0 &&
        goal.replace("/\s/g","").trim().length !== 0
      ) {
        const res: any = await addGoal(goalData);
        if (res.success) {
          dispatch(actionCreators.setMyGoals(res.goals));
          toast.success("Goal added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setGoalData(initGoalData);
          setIsAddGoal(false);
          setLoading(false);
        }
      } 
      else if (goal.replace("/\s/g","").trim().length === 0) {
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
      }
      else if (Number(amount.toString()) <= 0) {
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
        className={`w-[100%] xxs:w-[400px] xs:w-[450px] md:w-[500px] my-24 mx-auto text-slate-400
        p-6 flex flex-col justify-start items-center 
        gap-4 rounded-md shadow-md shadow-slate-500 bg-slate-950`}
        onSubmit={onAddGoal}
      >
        <h1 className={`text-2xl font-bold`}>Add Goal</h1>

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

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-900 
          bg-slate-950 transition-all duration-300`}
        >
          Add Goal
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-950 
          bg-slate-900 transition-all duration-300`}
          onClick={()=> setIsAddGoal(false)}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  );
};

export default AddGoalModal;
