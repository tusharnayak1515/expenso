import { Request, Response } from "express";
import Category from "../../models/Category";
import { ICategory, IExpense } from "../../entities/entityInterfaces";
import Expense from "../../models/Expense";

const updateExpense = async (req:Request, res:Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const {expenseId, amount, categoryId, expenseType, comment, expenseDate} = req.body;

        let expense : IExpense | any = await Expense.findById(expenseId);
        if(!expense) {
            return res.status(404).json({success, error: "Expense not found"});
        }

        if(expense?.user.toString() !== userId) {
            return res.status(403).json({success, error: "Not allowed"});
        }

        const category : ICategory | null = await Category.findById(categoryId).exec();

        if(!category) {
            return res.status(404).json({success, error: "Invalid category"});
        }

        expense = await Expense.findByIdAndUpdate(expenseId, {amount,category: categoryId, expenseType, comment, expenseDate}, {new: true}).exec();

        let year: any = req.query.year;
        let month: any = req.query.month;
        
        if ((year && month) && (isNaN(Number(year)) || isNaN(Number(month)))) {
            return res.status(400).json({ error: "Invalid year or month parameter." });
        }

        if (!year) {
            year = new Date().getFullYear();
        }

        if (!month) {
            month = new Date().getMonth() + 1;
        }

        const startOfMonth = new Date(Number(year), Number(month) - 1, 1);
        const endOfMonth = new Date(Number(year), Number(month), 0);

        let expenses : IExpense[] | any = await Expense.find({user: userId, expenseDate : {
            $gte: startOfMonth,
            $lte: endOfMonth,
        }}).sort("-expenseDate");

        expenses = await Category.populate(expenses, {path: "category"});

        success = true;
        return res.status(200).json({success, expenses});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default updateExpense;