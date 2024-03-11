import { Request, Response } from "express";
import Contact from "../../models/Contact";
import { ICreditTransaction } from "../../entities/entityInterfaces";
import CreditTransaction from "../../models/CreditTransaction";

const getTransactions = async(req: Request, res: Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const transactionId = req.params.id;

        let creditTransaction:any = await CreditTransaction.findById(transactionId);
        if(!creditTransaction) {
            return res.status(404).json({success, error: "Credit Transaction not found"});
        }

        if(creditTransaction?.user?.toString() !== userId) {
            return res.status(401).json({success, error: "Not allowed"});
        }

        success = true;
        return res.status(200).json({success, creditTransaction});
    } catch (error:any) {
        return res.status(500).json({success, error: error?.message});
    }
}

export default getTransactions;