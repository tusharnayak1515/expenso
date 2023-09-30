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
const updateGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const userId = req.body.user.id;
        const { id, goal, amount, status, completedDate } = req.body;
        let isGoal = yield Goal_1.default.findById(id).exec();
        if (!isGoal) {
            return res.status(404).json({ success, error: "Invalid goal" });
        }
        if ((isGoal === null || isGoal === void 0 ? void 0 : isGoal.user.toString()) !== userId) {
            return res.status(401).json({ success, error: "Not allowed" });
        }
        isGoal = yield Goal_1.default.findByIdAndUpdate(id, { goal, amount, status, completedDate }, { new: true }).exec();
        let goals = yield Goal_1.default.find({ user: userId }).sort("-createdAt").exec();
        success = true;
        return res.status(201).json({ success, goals });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = updateGoal;
//# sourceMappingURL=updateGoal.js.map