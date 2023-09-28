import { Request, Response } from "express";
import Goal from "../../models/Goal";
import { IGoal } from "../../entities/entityInterfaces";

const updateGoal = async (req:Request, res:Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const {id, goal, amount, status, completedDate} = req.body;

        let isGoal:IGoal | any = await Goal.findById(id).exec();
        if(!isGoal) {
            return res.status(404).json({success, error: "Invalid goal"});
        }

        if(isGoal?.user.toString() !== userId) {
            return res.status(401).json({success, error: "Not allowed"})
        }

        isGoal = await Goal.findByIdAndUpdate(id, {goal,amount,status,completedDate}, {new: true}).exec();

        let goals: IGoal[] | any = await Goal.find({user: userId}).sort("-createdAt").exec();

        success = true;
        return res.status(201).json({success, goals});
    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default updateGoal;