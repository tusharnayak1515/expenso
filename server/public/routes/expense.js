"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addExpense_1 = __importDefault(require("../controllers/expense/addExpense"));
const fetchUser_1 = __importDefault(require("../middlewares/fetchUser"));
const getMyExpenses_1 = __importDefault(require("../controllers/expense/getMyExpenses"));
const getExpense_1 = __importDefault(require("../controllers/expense/getExpense"));
const updateExpense_1 = __importDefault(require("../controllers/expense/updateExpense"));
const deleteExpense_1 = __importDefault(require("../controllers/expense/deleteExpense"));
const router = express_1.default.Router();
router.get("/", fetchUser_1.default, getMyExpenses_1.default);
router.get("/:id", fetchUser_1.default, getExpense_1.default);
router.post("/", fetchUser_1.default, addExpense_1.default);
router.put("/", fetchUser_1.default, updateExpense_1.default);
router.delete("/:id", fetchUser_1.default, deleteExpense_1.default);
exports.default = router;
//# sourceMappingURL=expense.js.map