import express from "express";
import fetchUser from "../middlewares/fetchUser";
import getAllCategories from "../controllers/category/getAllCategories";
const router = express.Router();

router.get("/", fetchUser, getAllCategories);

export default router;