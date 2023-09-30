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
const Goal_1 = __importDefault(require("../../models/Goal"));
const addGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const userId = req.body.user.id;
        const { goal, amount } = req.body;
        yield Goal_1.default.create({
            goal,
            amount,
            status: "pending",
            user: userId
        });
        let goals = yield Goal_1.default.find({ user: userId }).sort("-createdAt").exec();
        success = true;
        return res.status(201).json({ success, goals });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = addGoal;
//# sourceMappingURL=addGoal.js.map