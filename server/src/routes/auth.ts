import express from "express";
import signup from "../controllers/auth/signup";
import signin from "../controllers/auth/signin";
import fetchUser from "../middlewares/fetchUser";
import changedPassword from "../controllers/auth/changePassword";
import resetPassword from "../controllers/auth/resetPassword";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/change-password", fetchUser, changedPassword);
router.put("/reset-password", resetPassword);

export default router;