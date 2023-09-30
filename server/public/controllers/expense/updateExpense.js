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
const Category_1 = __importDefault(require("../../models/Category"));
const Expense_1 = __importDefault(require("../../models/Expense"));
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const userId = req.body.user.id;
        const { expenseId, amount, categoryId, expenseType, comment, expenseDate } = req.body;
        let expense = yield Expense_1.default.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ success, error: "Expense not found" });
        }
        if ((expense === null || expense === void 0 ? void 0 : expense.user.toString()) !== userId) {
            return res.status(403).json({ success, error: "Not allowed" });
        }
        const category = yield Category_1.default.findById(categoryId).exec();
        if (!category) {
            return res.status(404).json({ success, error: "Invalid category" });
        }
        expense = yield Expense_1.default.findByIdAndUpdate(expenseId, { amount, category: categoryId, expenseType, comment, expenseDate }, { new: true }).exec();
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        const startOfMonth = new Date(Number(year), Number(month) - 1, 1);
        const endOfMonth = new Date(Number(year), Number(month), 0);
        let expenses = yield Expense_1.default.find({ user: userId, expenseDate: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            } }).sort("-expenseDate");
        expenses = yield Category_1.default.populate(expenses, { path: "category" });
        success = true;
        return res.status(200).json({ success, expenses });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = updateExpense;
//# sourceMappingURL=updateExpense.js.map