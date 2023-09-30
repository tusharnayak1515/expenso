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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const secret = process.env.JWT_SECRET;
const fetchUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    const token = req.cookies.authorization || req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success,
            error: "Please authenticate using a valid token."
        });
    }
    try {
        const userToken = token.substring(7, token.length);
        console.log("userToken: ", userToken);
        const data = jsonwebtoken_1.default.verify(userToken, secret);
        console.log("data: ", data);
        // Checking if a user exists with the id received from the jwt
        let user = yield User_1.default.findById(data.user.id);
        if (!user) {
            return res.status(404).json({ success, error: "User does not exist." });
        }
        req.body.user = data.user;
        next();
    }
    catch (error) {
        console.log("error: ", error);
        success = false;
        return res.status(401).json({ success, error: error.message });
    }
});
exports.default = fetchUser;
//# sourceMappingURL=fetchUser.js.map