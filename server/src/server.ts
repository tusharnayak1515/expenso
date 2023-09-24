import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongo from "./db";
import otpRoutes from "./routes/token";
import authRoutes from "./routes/auth";
import expenseRoutes from "./routes/expense";
import categoryRoutes from "./routes/category";

const app = express();
const port = process.env.PORT || 9000;

const FRONTEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

connectToMongo();

app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use('/src/uploads', express.static(path.join(__dirname, 'uploads')));

import "./models/Token";
import "./models/User";
import "./models/Category";
import "./models/Expense";
import Category from "./models/Category";

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/categories", categoryRoutes);

const addCategories = async ()=> {
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
}

// addCategories();

app.listen(port, ()=> {
    console.log(`Server started successfully at port ${port}.`);
});