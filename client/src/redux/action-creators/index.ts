import { deleteCookie, getCookie } from "cookies-next";
import Cookies from 'js-cookie';

// ************************************* User Section *********************************************** \\

export const setToken = (token:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-token",
        payload: {
            user: token
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
    const token = Cookies.get('authorization');
    if(token) {
        Cookies.remove("authorization");
    }
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

// ************************************* Contacts Section *********************************************** \\

export const setMyContacts = (contacts:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-contacts",
        payload: {
            contacts
        }
    });
}

export const setContact = (contact:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-contact",
        payload: {
            contact
        }
    });
}

// ************************************* Credit Transactions Section *********************************************** \\

export const setTransactions = (transactions:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-transactions",
        payload: {
            transactions
        }
    });
}

export const setTransaction = (transaction:any)=>  async(dispatch:any)=> {
    dispatch({
        type: "set-transaction",
        payload: {
            transaction
        }
    });
}