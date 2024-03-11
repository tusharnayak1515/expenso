import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IContact } from "../entities/entityInterfaces";

interface IContactDocument extends IContact, Document {}

interface IContactModel extends Model<IContactDocument> {}

const ContactSchema = new Schema<IContactDocument, IContactModel>({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["store","person"],
        required: true
    },
    phone: {
        type: String,
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

const Contact = mongoose.model<IContactDocument, IContactModel>("Contact", ContactSchema);

export default Contact;