import express from "express";
import fetchUser from "../middlewares/fetchUser";
import addGoal from "../controllers/goal/addGoal";
import getMyGoals from "../controllers/goal/getMyGoals";
import updateGoal from "../controllers/goal/updateGoal";
import deleteGoal from "../controllers/goal/deleteGoal";

const router = express.Router();

router.get("/", fetchUser, getMyGoals);
router.post("/", fetchUser, addGoal);
router.put("/", fetchUser, updateGoal);
router.delete("/:id", fetchUser, deleteGoal);

export default router;