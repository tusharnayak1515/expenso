import mongoose, { Document, Schema, Model } from "mongoose";
import { IExpense } from "../entities/entityInterfaces";

interface IExpenseDocument extends IExpense, Document {}

interface IExpenseModel extends Model<IExpenseDocument> {}

const ExpenseSchema = new Schema<IExpenseDocument, IExpenseModel>({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    expenseType: {
        type: String,
        required: true
    },
    expenseDate: {
        type: Date,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: true, versionKey: false });

const Expense = mongoose.model<IExpenseDocument, IExpenseModel>("Expense", ExpenseSchema);

export default Expense;