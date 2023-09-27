import { Request, Response } from "express";
import Goal from "../../models/Goal";
import { IGoal } from "../../entities/entityInterfaces";

const getMyGoals = async (req:Request, res:Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;

        let goals: IGoal[] | any = await Goal.find({user: userId}).sort("-createdAt").exec();

        success = true;
        return res.status(201).json({success, goals});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default getMyGoals;