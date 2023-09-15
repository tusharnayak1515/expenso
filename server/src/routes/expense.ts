import express from "express";
import addExpense from "../controllers/expense/addExpense";
import fetchUser from "../middlewares/fetchUser";
import getMyExpenses from "../controllers/expense/getMyExpenses";
import getExpense from "../controllers/expense/getExpense";
import updateExpense from "../controllers/expense/updateExpense";
import deleteExpense from "../controllers/expense/deleteExpense";

const router = express.Router();

router.get("/", fetchUser, getMyExpenses);
router.get("/:id", fetchUser, getExpense);
router.post("/", fetchUser, addExpense);
router.put("/", fetchUser, updateExpense);
router.delete("/:id", fetchUser, deleteExpense);

export default router;