"use client";

import { getProfile } from "@/apiCalls/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { actionCreators } from "@/redux";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const FetchTokenPage = () => {
  const query: any = useSearchParams();
  const token = query.get("token");
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);

  const fetchProfile = useCallback(async () => {
    try {
      const res: any = await getProfile();
      if (res?.success) {
        localStorage.setItem("expenso_user_profile", JSON.stringify(res?.user));
        dispatch(actionCreators.userSignin(res?.user));
      }
    } catch (error: any) {
      console.log(
        "Error in fetching profile, in page.tsx: ",
        error.response.data.error
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      if (token) {
        setCookie("authorization", token, {
          maxAge: 60 * 60 * 24 * 7,
        });
        dispatch(actionCreators.setToken(token));
        fetchProfile();
        router.replace("/dashboard");
        toast.success("Welcome to Expenso", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        router.replace("/signin");
        localStorage.removeItem("expenso_user_profile");
      }
    } else {
      router.replace("/dashboard");
      toast.success("Welcome to Expenso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [token, user, dispatch, fetchProfile, router]);

  return (
    <div className={`min-h-[100vh] w-full flex justify-center items-center`}>
      <LoadingSpinner />
    </div>
  );
};

export default FetchTokenPage;
