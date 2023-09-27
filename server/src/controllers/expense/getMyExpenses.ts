import { Request, Response } from "express";
import Category from "../../models/Category";
import { IExpense } from "../../entities/entityInterfaces";
import Expense from "../../models/Expense";

const getMyExpenses = async (req: Request, res: Response) => {
    let success = false;
    try {
        const userId = req.body.user.id;

        let year: any = req.query.year;
        let month: any = req.query.month;
        let expenseType: any = req.query.expenseType;

        
        if ((year && month) && (isNaN(Number(year)) || isNaN(Number(month)))) {
            return res.status(400).json({ error: "Invalid year or month parameter." });
        }

        if (!year) {
            year = new Date().getFullYear();
        }

        if (!month) {
            month = new Date().getMonth() + 1;
        }
        console.log("year: ",year);
        console.log("month: ",Number(month));

        const startOfMonth = new Date(Number(year), Number(month) - 1, 1);
        const endOfMonth = new Date(Number(year), Number(month), 0);

        const filters: any = {
            user: userId,
            expenseDate: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        };

        if (expenseType && expenseType !== 'null' && expenseType !== "all") {
            filters.expenseType = expenseType;
        }

        console.log("filters: ",filters);

        let expenses: IExpense[] | any = await Expense.find(filters).sort("-expenseDate");

        expenses = await Category.populate(expenses, { path: "category" });

        expenses = await Category.populate(expenses, { path: "category" });

        success = true;
        return res.status(200).json({ success, expenses });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default getMyExpenses;