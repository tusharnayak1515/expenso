import express from "express";
import sendOtp from "../controllers/otp/sendOtp";
import verifyOtp from "../controllers/otp/verifyOtp";

const router = express.Router();

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

export default router;