"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../models/User"));
const Token_1 = __importDefault(require("../../models/Token"));
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const { email, otp } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            success = false;
            console.log(`Error in verify otp route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success, error: "No user found with this email" });
        }
        let token = yield Token_1.default.findOne({ email: email });
        if (!token) {
            return res.status(404).json({ success, error: "Token not found" });
        }
        if (token.otp !== parseInt(otp)) {
            return res.status(401).json({ success, error: "Incorrect OTP" });
        }
        token = yield Token_1.default.findByIdAndDelete(token._id.toString(), { new: true });
        success = true;
        return res.status(200).json({ success });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = verifyOtp;
//# sourceMappingURL=verifyOtp.js.map