import express from "express";
import signup from "../controllers/auth/signup";
import signin from "../controllers/auth/signin";
import fetchUser from "../middlewares/fetchUser";
import changedPassword from "../controllers/auth/changePassword";
import resetPassword from "../controllers/auth/resetPassword";
import updateProfile from "../controllers/auth/updateProfile";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update-profile", fetchUser, updateProfile);
router.put("/change-password", fetchUser, changedPassword);
router.put("/reset-password", resetPassword);

export default router;