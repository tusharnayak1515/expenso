import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { ICategory } from "../entities/entityInterfaces";

interface ICategoryDoument extends ICategory, Document {}

interface ICategoryModel extends Model<ICategoryDoument> {}

const CategorySchema = new Schema<ICategoryDoument, ICategoryModel>({
    name: {
        type: String,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: true, versionKey: false });

const Category = mongoose.model<ICategoryDoument, ICategoryModel>("Category", CategorySchema);

export default Category;