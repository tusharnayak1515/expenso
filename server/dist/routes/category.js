"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchUser_1 = __importDefault(require("../middlewares/fetchUser"));
const getAllCategories_1 = __importDefault(require("../controllers/category/getAllCategories"));
const router = express_1.default.Router();
router.get("/", fetchUser_1.default, getAllCategories_1.default);
exports.default = router;
//# sourceMappingURL=category.js.map