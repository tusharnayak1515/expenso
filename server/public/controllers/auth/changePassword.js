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
const changedPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const userId = req.body.user.id;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        let user = yield User_1.default.findById(userId).exec();
        const passwordCheck = yield bcryptjs_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
        if (!passwordCheck) {
            return res.status(401).json({ success, error: "Incorrect old password" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(401).json({ success, error: "Password mismatch" });
        }
        if (newPassword === oldPassword) {
            return res.status(401).json({ success, error: "New password cannot be same as old password" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const securedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
        user = yield User_1.default.findByIdAndUpdate(userId, { password: securedPassword }, { new: true }).select("-password -createdAt -updatedAt").exec();
        success = true;
        return res.status(200).json({ success });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = changedPassword;
//# sourceMappingURL=changePassword.js.map