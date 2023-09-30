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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../models/User"));
const Token_1 = __importDefault(require("../../models/Token"));
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let success = false;
    try {
        const { email, newPassword, confirmPassword, otp } = req.body;
        let user = yield User_1.default.findOne({ email }).exec();
        const userId = user === null || user === void 0 ? void 0 : user._id.toString();
        if (newPassword !== confirmPassword) {
            return res.status(401).json({ success, error: "Password mismatch" });
        }
        let token = yield Token_1.default.findOne({ email }).exec();
        if (!token) {
            return res.status(404).json({ success, error: "Invalid Token." });
        }
        if (token.otp !== parseInt(otp)) {
            return res.status(403).json({ success, error: "Incorrect otp." });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const securedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
        user = yield User_1.default.findByIdAndUpdate(userId, { password: securedPassword }, { new: true }).select("-password -createdAt -updatedAt").exec();
        token = yield Token_1.default.findOneAndDelete((_a = token === null || token === void 0 ? void 0 : token._id) === null || _a === void 0 ? void 0 : _a.toString(), { new: true }).exec();
        success = true;
        return res.status(200).json({ success });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = resetPassword;
//# sourceMappingURL=resetPassword.js.map