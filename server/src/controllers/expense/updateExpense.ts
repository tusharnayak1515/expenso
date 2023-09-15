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

        expense = await Category.populate(expense, {path: "category"});

        success = true;
        return res.status(201).json({success, expense});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default updateExpense;