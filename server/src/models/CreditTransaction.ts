import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { ICreditTransaction } from "../entities/entityInterfaces";

interface ICreditTransactionDocument extends ICreditTransaction, Document {}

interface ICreditTransactionModel extends Model<ICreditTransactionDocument> {}

const CreditTransactionSchema = new Schema<ICreditTransactionDocument, ICreditTransactionModel>({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        default: null
    },
    paymentStatus: {
        type: String,
        enum: ["pending","paid"],
        required: true
    },
    contact: {
        type: Types.ObjectId,
        ref: "Contact",
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: true, versionKey: false });

const CreditTransaction = mongoose.model<ICreditTransactionDocument, ICreditTransactionModel>("CreditTransaction", CreditTransactionSchema);

export default CreditTransaction;
