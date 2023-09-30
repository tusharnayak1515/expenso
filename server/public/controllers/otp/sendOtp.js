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
const Token_1 = __importDefault(require("../../models/Token"));
const sendEmail_1 = __importDefault(require("../../services/sendEmail"));
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const { email } = req.body;
        const otp = Math.floor(1000 + Math.random() * 9000);
        let token = yield Token_1.default.findOne({ email });
        if (!token) {
            // Creating the token
            token = yield Token_1.default.create({
                email,
                otp,
            });
        }
        else {
            token = yield Token_1.default.findByIdAndUpdate(token._id.toString(), { otp }, { new: true });
        }
        // Sending OTP, to the user's email
        yield (0, sendEmail_1.default)({
            subject: "OTP verification! This OTP is valid for 5 minutes only!",
            text: `OTP: ${token === null || token === void 0 ? void 0 : token.otp}`,
            email: email,
        });
        success = true;
        return res.status(200).json({ success });
    }
    catch (error) {
        success = false;
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = sendOtp;
//# sourceMappingURL=sendOtp.js.map