"use client";

import React, { useCallback, useEffect, useState } from "react";
import { deleteGoal, fetchMyGoals } from "@/apiCalls/goal";
import { actionCreators } from "@/redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AddGoalModal from "../modals/AddGoalModal";
import UpdateGoalModal from "../modals/UpdateGoalModal";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const MyGoals = () => {
  const dispatch: any = useDispatch();
  const { goals } = useSelector(
    (state: any) => state.goalReducer,
    shallowEqual
  );

  const [isAddGoal, setIsAddGoal] = useState(false);
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    try {
      const res: any = await fetchMyGoals();
      if (res.success) {
        dispatch(actionCreators.setMyGoals(res.goals));
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(
        "Error in fetching goals, in MyGoals.tsx: ",
        error.response.data.error
      );
    }
  }, [dispatch]);

  const onDeleteGoal = async (id: string) => {
    setLoading(true);
    try {
      const res: any = await deleteGoal({ id });
      if (res.success) {
        dispatch(actionCreators.setMyGoals(res.goals));
        toast.success("Goal deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
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

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return (
    <div className={`w-full flex flex-col justify-start items-center gap-4`}>
      {isAddGoal && (
        <AddGoalModal setIsAddGoal={setIsAddGoal} setLoading={setLoading} />
      )}
      {goal && (
        <UpdateGoalModal
          goal={goal}
          setGoal={setGoal}
          setLoading={setLoading}
        />
      )}
      {loading && <LoadingSpinner />}
      <button
        className={`py-2 px-4 text-slate-400 border border-slate-400 rounded-md bg-slate-950`}
        onClick={() => setIsAddGoal(true)}
      >
        Add goal
      </button>
      {goals?.length === 0 ? (
        <p className={`text-xl`}>No Goals to show</p>
      ) : (
        <div className="w-full xl:w-[80%] overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Goal</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Completion Date</th>
                <th className="px-4 py-2 border">Update</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {goals?.map((goal: any) => {
                const completionDate = goal?.completedDate
                  ? `${new Date(goal?.completedDate).getDate()}/${
                      new Date(goal?.completedDate).getMonth() + 1
                    }/${new Date(goal?.completedDate).getFullYear()}`
                  : `N/A`;
                return (
                  <tr key={goal?._id}>
                    <td className="border px-4 py-2 text-center">
                      {goal?.goal}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {goal?.amount}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {goal?.status}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {completionDate}
                    </td>
                    <td className="border px-4 py-2">
                      <MdEdit
                        className={`mx-auto text-xl text-orange-600 cursor-pointer`}
                        onClick={() => setGoal(goal)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <MdDelete
                        className={`mx-auto text-xl text-red-600 cursor-pointer`}
                        onClick={() => onDeleteGoal(goal?._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGoals;
