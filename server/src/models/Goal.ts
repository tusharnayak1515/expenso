import mongoose, { Document, Schema, Model } from "mongoose";
import { IGoal } from "../entities/entityInterfaces";

interface IGoalDocument extends IGoal, Document {}

interface IGoalModel extends Model<IGoalDocument> {}

const GoalSchema = new Schema<IGoalDocument, IGoalModel>({
    goal: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    completedDate: {
        type: Date,
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: true, versionKey: false });

const Goal = mongoose.model<IGoalDocument, IGoalModel>("Goal", GoalSchema);

export default Goal;