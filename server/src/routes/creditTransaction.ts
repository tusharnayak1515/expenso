import express from "express";
import fetchUser from "../middlewares/fetchUser";
import getTransactions from "../controllers/credit-transactions/getTransactions";
import addTransaction from "../controllers/credit-transactions/addTransaction";
import updateTransaction from "../controllers/credit-transactions/updateTransaction";
import { body } from "express-validator";
import deleteTransaction from "../controllers/credit-transactions/deleteTransaction";

const router = express.Router();

router.get("/:id", fetchUser, getTransactions);

// router.get("/get/:id", fetchUser, getTransactions);

router.post("/:id", [
    body("amount", "Amount cannot be empty").isFloat({min: 1}),
    body("date", "Date cannot be empty").isDate(),
    body("comment","Comment cannot be empty").exists()
], fetchUser, addTransaction);

router.put("/:id", [
    body("amount", "Amount cannot be empty").isFloat({min: 1}),
    body("date", "Date cannot be empty").isDate(),
    body("comment","Comment cannot be empty").exists()
], fetchUser, updateTransaction);

router.delete("/:id", fetchUser, deleteTransaction);

export default router;