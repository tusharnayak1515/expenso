import { deleteCookie, getCookie } from "cookies-next";

// ************************************* User Section *********************************************** \\

export const userSignin = (user:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "signin",
        payload: {
            user: getCookie("authorization"),
            profile: user
        }
    });
}

export const updateProfile = (user:any)=> async(dispatch:any)=> {
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

export const addExpense = (expenses:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "add-expense",
        payload: {
            expenses
        }
    });
}

export const updateExpense = (expenses:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "update-expense",
        payload: {
            expenses
        }
    });
}

export const deleteExpense = (expenses:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "delete-expense",
        payload: {
            expenses
        }
    });
}

// ************************************* Categories Section *********************************************** \\

export const setAllCategories = (categories:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-categories",
        payload: {
            categories
        }
    });
}

// ************************************* Goals Section *********************************************** \\

export const setMyGoals = (goals:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-goals",
        payload: {
            goals
        }
    });
}

export const setGoal = (goal:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-goal",
        payload: {
            goal
        }
    });
}