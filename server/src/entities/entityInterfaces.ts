import { Types } from "mongoose";

export interface IToken {
    [x: string]: any;
    email: string;
    otp: number;
    expiry?: number;
    createdAt?: Date;
}

export interface IUser {
    [x: string]: any;
    name: string;
    email: string;
    dp?: string;
    password: string;
    googleId?: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface ICategory {
    name: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface IExpense {
    amount: number;
    category: Types.ObjectId | string;
    expenseType: string;
    comment: string;
    expenseDate: Date;
    user: Types.ObjectId | string;
    createdAt?: number;
    updatedAt?: number;
}

export interface IGoal {
    goal: string;
    amount: number;
    status: string;
    completedDate?: Date;
    user: Types.ObjectId | string;
    createdAt?: number;
    updatedAt?: number;
}