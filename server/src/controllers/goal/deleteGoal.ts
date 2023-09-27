import { Request, Response } from "express";
import Goal from "../../models/Goal";
import { IGoal } from "../../entities/entityInterfaces";

const deleteGoal = async (req:Request, res:Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const goalId = req.params.id;

        let isGoal:IGoal | any = await Goal.findById(goalId).exec();
        if(!isGoal) {
            return res.status(404).json({success, error: "Invalid goal"});
        }

        await Goal.findByIdAndDelete(goalId, {new: true}).exec();

        let goals: IGoal[] | any = await Goal.find({user: userId}).sort("-createdAt").exec();

        success = true;
        return res.status(201).json({success, goals});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default deleteGoal;