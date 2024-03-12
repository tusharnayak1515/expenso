import express from "express";
import fetchUser from "../middlewares/fetchUser";
import getTransactions from "../controllers/credit-transactions/getTransactions";
import addTransaction from "../controllers/credit-transactions/addTransaction";
import updateTransaction from "../controllers/credit-transactions/updateTransaction";
import { body } from "express-validator";
import deleteTransaction from "../controllers/credit-transactions/deleteTransaction";
import markAsPaid from "../controllers/credit-transactions/markAsPaid";
import getTransaction from "../controllers/credit-transactions/getTransaction";

const router = express.Router();

router.get("/:id", fetchUser, getTransactions);

router.get("/get/:id", fetchUser, getTransaction);

router.post("/:id", [
    body("amount", "Amount cannot be empty").isFloat({min: 1}),
    body("date", "Invalid date").isDate(),
    body("comment","Comment cannot be empty").exists()
], fetchUser, addTransaction);

router.put("/:id", [
    body("amount", "Amount cannot be empty").isFloat({min: 1}),
    body("date", "Date cannot be empty").isDate(),
    body("comment","Comment cannot be empty").exists(),
    body("paymentStatus","Invalid payment status").optional().isIn(["pending", "paid"]),
    body("paymentDate","Invalid payment date").optional().isDate(),
], fetchUser, updateTransaction);

router.put("/paid/:id", [
    body("fromDate", "Invalid fromDate").isDate(),
    body("toDate", "Invalid toDate").isDate(),
    body("paymentDate","Invalid payment date").isDate(),
], fetchUser, markAsPaid);

router.delete("/:id", fetchUser, deleteTransaction);

export default router;