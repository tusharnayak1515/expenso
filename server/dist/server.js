"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const db_1 = __importDefault(require("./db"));
require("./passport");
const token_1 = __importDefault(require("./routes/token"));
const auth_1 = __importDefault(require("./routes/auth"));
const expense_1 = __importDefault(require("./routes/expense"));
const category_1 = __importDefault(require("./routes/category"));
const goal_1 = __importDefault(require("./routes/goal"));
const app = (0, express_1.default)();
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const port = process.env.PORT || 9000;
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions',
});
store.on('error', (error) => {
    console.error('MongoDB session store error:', error);
});
const FRONTEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://expenso-jet.vercel.app";
console.log("FRONTEND_URL: ", FRONTEND_URL);
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: "expenso",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
(0, db_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express_1.default.static(path_1.default.join('public', 'uploads')));
require("./models/Token");
require("./models/Category");
require("./models/Expense");
require("./models/Goal");
app.use("/api/otp", token_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/expense", expense_1.default);
app.use("/api/categories", category_1.default);
app.use("/api/goals", goal_1.default);
// const updateSchema = async ()=> {
//     User.updateMany(
//         {},
//         {
//             $set: {googleId: null},
//         },
//         {upsert: true}
//         )
//         .then((data:any)=> {
//             console.log("Value updated: ",data);
//         }
//     );
// }
// updateSchema();
// const addCategories = async () => {
// await Category.create({
//     name: "shopping"
// });
// await Category.create({
//     name: "house rent"
// });
// await Category.create({
//     name: "recharge"
// });
// await Category.create({
//     name: "medicines"
// });
// await Category.create({
//     name: "grocery"
// });
// await Category.create({
//     name: "gold"
// });
// await Category.create({
//     name: "mutual fund"
// });
// await Category.create({
//     name: "stock trading"
// });
// await Category.create({
//     name: "other investment"
// });
// await Category.create({
//     name: "salary"
// });
// await Category.create({
//     name: "other"
// });
// await Category.create({
//     name: "food"
// });
// }
// addCategories();
app.listen(port, () => {
    console.log(`Server started successfully at port ${port}.`);
});
//# sourceMappingURL=server.js.map