import { Request, Response } from "express";
import Category from "../../models/Category";
import { ICategory, IExpense } from "../../entities/entityInterfaces";
import Expense from "../../models/Expense";

const deleteExpense = async (req:Request, res:Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const expenseId = req.params.id;

        let expense : IExpense | any = await Expense.findById(expenseId);
        if(!expense) {
            return res.status(404).json({success, error: "Expense not found"});
        }

        if(expense?.user.toString() !== userId) {
            return res.status(403).json({success, error: "Not allowed"});
        }

        await Expense.findByIdAndDelete(expenseId, {new: true});

        expense = await Category.populate(expense, {path: "category"});

        success = true;
        return res.status(200).json({success, expense});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default deleteExpense;