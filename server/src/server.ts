import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongo from "./db";
import otpRoutes from "./routes/token";
import authRoutes from "./routes/auth";

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

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, ()=> {
    console.log(`Server started successfully at port ${port}.`);
});