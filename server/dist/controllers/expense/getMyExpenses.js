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
const getMyExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        const userId = req.body.user.id;
        let year = req.query.year;
        let month = req.query.month;
        let expenseType = req.query.expenseType;
        if ((year && month) && (isNaN(Number(year)) || isNaN(Number(month)))) {
            return res.status(400).json({ error: "Invalid year or month parameter." });
        }
        if (!year) {
            year = new Date().getFullYear();
        }
        if (!month) {
            month = new Date().getMonth() + 1;
        }
        console.log("year: ", year);
        console.log("month: ", Number(month));
        const startOfMonth = new Date(Number(year), Number(month) - 1, 1);
        const endOfMonth = new Date(Number(year), Number(month), 0);
        const filters = {
            user: userId,
            expenseDate: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        };
        if (expenseType && expenseType !== 'null' && expenseType !== "all") {
            filters.expenseType = expenseType;
        }
        console.log("filters: ", filters);
        let expenses = yield Expense_1.default.find(filters).sort("-expenseDate");
        expenses = yield Category_1.default.populate(expenses, { path: "category" });
        expenses = yield Category_1.default.populate(expenses, { path: "category" });
        success = true;
        return res.status(200).json({ success, expenses });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = getMyExpenses;
//# sourceMappingURL=getMyExpenses.js.map