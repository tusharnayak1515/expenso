"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/expenso?retryWrites=true&w=majority";
const connectToMongo = () => {
    mongoose_1.default
        .connect(mongoUri)
        .then(() => {
        console.log(`Connected to MongoDB successfully.`);
    })
        .catch((error) => {
        console.log(`MongoDB connection error: ${error.message}`);
    });
};
exports.default = connectToMongo;
//# sourceMappingURL=db.js.map