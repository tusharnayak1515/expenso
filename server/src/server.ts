import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectMongo from 'connect-mongodb-session';

import connectToMongo from "./db";
import otpRoutes from "./routes/token";
import authRoutes from "./routes/auth";
import expenseRoutes from "./routes/expense";
import categoryRoutes from "./routes/category";
import goalRoutes from "./routes/goal";

const app = express();
const MongoDBStore = connectMongo(session);
const port = process.env.PORT || 9000;

const store = new MongoDBStore({
    uri: process.env.MONGO_URI!,
    collection: 'sessions',
});


store.on('error', (error) => {
    console.error('MongoDB session store error:', error);
});

const FRONTEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://expenso-jet.vercel.app";
console.log("FRONTEND_URL: ", FRONTEND_URL);

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(
    session({
        secret: "expenso",
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

import "./passport";

connectToMongo();

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join('public', 'uploads')));

import "./models/Token";
import "./models/User";
import "./models/Category";
import "./models/Expense";
import "./models/Goal";
import "./models/Category";

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/goals", goalRoutes);

app.listen(port, () => {
    console.log(`Server started successfully at port ${port}.`);
});
