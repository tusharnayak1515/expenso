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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Token_1 = __importDefault(require("../../models/Token"));
const User_1 = __importDefault(require("../../models/User"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let success = false;
    try {
        const { name, email, password, otp } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(`Error in signup route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }
        let token = yield Token_1.default.findOne({ email }).exec();
        console.log("token: ", token);
        if (!token) {
            return res.status(404).json({ success, error: "Invalid Token." });
        }
        if (token.otp !== parseInt(otp)) {
            return res.status(403).json({ success, error: "Incorrect otp." });
        }
        let user = yield User_1.default.findOne({ email }).exec();
        if (user) {
            return res
                .status(403)
                .json({
                success,
                error: "This email is associated to another account.",
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        user = yield User_1.default.create({
            name,
            email,
            password: hashedPassword
        });
        token = yield Token_1.default.findOneAndDelete((_a = token === null || token === void 0 ? void 0 : token._id) === null || _a === void 0 ? void 0 : _a.toString(), { new: true }).exec();
        success = true;
        return res.status(200).json({ success });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = signup;
//# sourceMappingURL=signup.js.map