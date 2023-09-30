import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectMongo from 'connect-mongodb-session';

import connectToMongo from "./db";
import "./passport";
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
console.log("FRONTEND_URL: ",FRONTEND_URL);

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

connectToMongo();

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

import "./models/Token";
import User from "./models/User";
import "./models/Category";
import "./models/Expense";
import "./models/Goal";
import Category from "./models/Category";

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/goals", goalRoutes);

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
