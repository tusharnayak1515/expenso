"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchUser_1 = __importDefault(require("../middlewares/fetchUser"));
const addGoal_1 = __importDefault(require("../controllers/goal/addGoal"));
const getMyGoals_1 = __importDefault(require("../controllers/goal/getMyGoals"));
const updateGoal_1 = __importDefault(require("../controllers/goal/updateGoal"));
const deleteGoal_1 = __importDefault(require("../controllers/goal/deleteGoal"));
const router = express_1.default.Router();
router.get("/", fetchUser_1.default, getMyGoals_1.default);
router.post("/", fetchUser_1.default, addGoal_1.default);
router.put("/", fetchUser_1.default, updateGoal_1.default);
router.delete("/:id", fetchUser_1.default, deleteGoal_1.default);
exports.default = router;
//# sourceMappingURL=goal.js.map