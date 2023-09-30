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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../models/User"));
const secret = process.env.JWT_SECRET;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const { email, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(`Error in signin route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }
        let user = yield User_1.default.findOne({ email }).exec();
        if (!user) {
            return res
                .status(404)
                .json({
                success,
                error: "User not found",
            });
        }
        const passwordCompare = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({ success, error: "Incorrect credentials." });
        }
        user = yield User_1.default.findById(user._id.toString()).select("-password -createdAt -updatedAt").exec();
        const data = {
            user: {
                id: user === null || user === void 0 ? void 0 : user.id
            },
        };
        const jwtToken = jsonwebtoken_1.default.sign(data, secret);
        res.cookie("authorization", `Bearer ${jwtToken}`, {
            maxAge: 60 * 60 * 24 * 1000,
            path: "/",
            httpOnly: true,
            sameSite: "none",
            secure: true
        });
        success = true;
        return res.status(200).json({ success, user, token: `Bearer ${jwtToken}` });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = signin;
//# sourceMappingURL=signin.js.map