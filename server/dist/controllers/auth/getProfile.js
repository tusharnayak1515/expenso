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
const User_1 = __importDefault(require("../../models/User"));
const secret = process.env.JWT_SECRET;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const userId = req.body.user.id;
        let user = yield User_1.default.findById(userId).exec();
        if (!user) {
            return res
                .status(404)
                .json({
                success,
                error: "User not found",
            });
        }
        success = true;
        return res.status(200).json({ success, user });
    }
    catch (error) {
        console.log("error: ", error);
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = getProfile;
//# sourceMappingURL=getProfile.js.map