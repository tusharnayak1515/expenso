import { deleteCookie, getCookie } from "cookies-next";

// ************************************* User Section *********************************************** \\

export const userSignup = (user:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "signup",
        payload: {
            user: getCookie("authorization"),
            profile: user
        }
    });
}

export const userSignin = (user:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "signin",
        payload: {
            user: getCookie("authorization"),
            profile: user
        }
    });
}

export const updateUserProfile = (user:any)=> async(dispatch:any)=> {
    if(typeof localStorage !== "undefined") {
        localStorage.setItem("expenso_user_profile", JSON.stringify(user));
    }
    dispatch({
        type: "edit-profile",
        payload: {
            profile: user
        }
    });
}

export const logout = ()=>  async(dispatch:any)=> {
    deleteCookie("authorization");
    if(typeof localStorage !== "undefined") {
        localStorage.removeItem("expenso_user_profile");
    }
    dispatch({
        type: "logout"
    });
}

// ************************************* Expense Section *********************************************** \\

export const setAllExpenses = (expenses:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-expenses",
        payload: {
            expenses
        }
    });
}

export const setExpense = (expense:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-expense",
        payload: {
            expense
        }
    });
}

export const addExpense = (expense:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "add-expense",
        payload: {
            expense
        }
    });
}

export const updateExpense = (expense:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "update-expense",
        payload: {
            expense
        }
    });
}

export const deleteExpense = (expense:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "delete-expense",
        payload: {
            expense
        }
    });
}