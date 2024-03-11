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
import contactRoutes from "./routes/contact";
import creditTransactionsRoute from "./routes/creditTransaction";
import cron from 'node-cron';

const app = express();
const MongoDBStore = connectMongo(session);
const port = process.env.PORT || 9000;

const store = new MongoDBStore({
    uri: process.env.MONGO_URI || "mongodb://0.0.0.0:27017/expenso?retryWrites=true&w=majority",
    collection: 'sessions',
});

store.on('error', (error) => {
    console.error('MongoDB session store error:', error);
});

const FRONTEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://expenso-jet.vercel.app";
console.log("FRONTEND_URL: ", FRONTEND_URL);

const allowedOrigins = [
    FRONTEND_URL,
    'exp://192.168.0.194:8081',
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

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
import User from "./models/User";
import "./models/Category";
import Expense from "./models/Expense";
import "./models/Goal";
import Category from "./models/Category";
import "./models/Contact";
import "./models/CreditTransaction";
import { IExpense } from "./entities/entityInterfaces";
import sendEmail from "./services/sendEmail";

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/credit-transactions", creditTransactionsRoute);

const getMonthlyExpenseReport = async (userId: string) => {
    try {
        const date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (month === 1) {
            month = 12;
            year = year - 1;
        }
        else {
            month -= 1;
        }

        const startOfMonth = new Date(Number(year), Number(month) - 1, 1);
        const endOfMonth = new Date(Number(year), Number(month), 0);

        const filters: any = {
            user: userId,
            expenseDate: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        };

        let expenses: IExpense[] | any = await Expense.find(filters).sort("-expenseDate");

        expenses = await Category.populate(expenses, { path: "category" });

        expenses = await Category.populate(expenses, { path: "category" });

        return expenses;
    } catch (error: any) {
        console.log("Error in fetching monthly expense report: ", error?.message);
        return null;
    }
}

const cronJob = cron.schedule('0 0 1 1 *', async () => {
    console.log("run");
    try {
        const users = await User.find();
        for (let user of users) {
            const monthlyExpenseReport = await getMonthlyExpenseReport(user?._id?.toString());
            if (!monthlyExpenseReport) {
                console.log("Error in fetching monthly expense report");
            }
            else {
                if (monthlyExpenseReport?.length === 0) {
                    return;
                }
                const date = new Date();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                if (month === 1) {
                    month = 12;
                    year = year - 1;
                }
                else {
                    month -= 1;
                }
                const lastMonth = new Date(year, month - 1);
                const fullMonthName = lastMonth.toLocaleString('en-US', { month: 'long' });

                let creditAmount = 0;
                let debitAmount = 0;
                let investmentAmount = 0;

                for (let expense of monthlyExpenseReport) {
                    if (expense?.expenseType === "credit") {
                        creditAmount += expense?.amount;
                    }
                    else if (expense?.expenseType === "debit") {
                        debitAmount += expense?.amount;
                    }
                    else if (expense?.expenseType === "investment") {
                        investmentAmount += expense?.amount;
                    }
                }

                const groupedExpenses: any = [];

                for (let expObj of monthlyExpenseReport) {
                    if (groupedExpenses.some((obj: any) => obj?.category === expObj?.category?.name)) {
                        const data: any = {
                            category: expObj?.category?.name
                        };
                        groupedExpenses?.map((expenseObj: any) => 
                        expenseObj?.category === expObj?.category?.name ? 
                        { ...data, amount: expenseObj?.amount + expObj?.amount } : 
                        expenseObj);
                    }
                    else {
                        const data: any = {
                            category: expObj?.category?.name,
                            amount: expObj?.amount
                        };
                        groupedExpenses.push(data);
                    }
                }

                let categorizedExpense = ``;

                for (let expObj of groupedExpenses) {
                    let item = `<p>${expObj?.category}: <b>₹${expObj?.amount}</b></p>`;
                    categorizedExpense += `${item}\n`;
                }

                const emailContent = `
                <h2>Monthly Expense Report</h2>
                <p>Here is your expense report for the previous month:</p>
                <p>Credit Amount: <b>₹${creditAmount}</b></p>
                <p>Debit Amount: <b>₹${debitAmount}</b></p>
                <p>Investment Amount: <b>₹${investmentAmount}</b></p>
                ${categorizedExpense}
            `;

                await sendEmail({
                    subject: `Monthly expense report for the month of ${fullMonthName}, ${year}`,
                    html: emailContent,
                    email: user?.email
                });
            }
        }
    } catch (error: any) {
        console.error('Error sending email:', error?.message);
    }
}, { timezone: "Asia/Kolkata" });

cronJob.start();

app.listen(port, () => {
    console.log(`Server started successfully at port ${port}.`);
});
