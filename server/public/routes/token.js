"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendOtp_1 = __importDefault(require("../controllers/otp/sendOtp"));
const verifyOtp_1 = __importDefault(require("../controllers/otp/verifyOtp"));
const router = express_1.default.Router();
router.post("/send", sendOtp_1.default);
router.post("/verify", verifyOtp_1.default);
exports.default = router;
//# sourceMappingURL=token.js.map