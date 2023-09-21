import { Request, Response } from "express";
import Category from "../../models/Category";
import { ICategory } from "../../entities/entityInterfaces";

const getAllCategories = async (req:Request, res:Response)=> {
    let success = false;
    try {
        let categories : ICategory[] | any = await Category.find().sort("name");

        success = true;
        return res.status(200).json({success, categories});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default getAllCategories;