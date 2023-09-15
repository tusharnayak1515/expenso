import { Request, Response } from "express";
import Category from "../../models/Category";
import { ICategory, IExpense } from "../../entities/entityInterfaces";
import Expense from "../../models/Expense";

const addExpense = async (req:Request, res:Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const {amount, categoryId, expenseType, comment, expenseDate} = req.body;

        const category : ICategory | null = await Category.findById(categoryId).exec();

        if(!category) {
            return res.status(404).json({success, error: "Invalid category"});
        }

        let expense : IExpense | any = await Expense.create({
            amount,
            category: categoryId,
            expenseType,
            comment,
            expenseDate,
            user: userId
        });

        expense = await Category.populate(expense, {path: "category"});

        success = true;
        return res.status(201).json({success, expense});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default addExpense;