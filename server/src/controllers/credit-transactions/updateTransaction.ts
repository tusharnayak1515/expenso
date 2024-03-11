import { Request, Response } from "express";
import Contact from "../../models/Contact";
import { validationResult } from "express-validator";
import CreditTransaction from "../../models/CreditTransaction";
import { ICreditTransaction } from "../../entities/entityInterfaces";

const updateTransaction = async(req: Request, res: Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const transactionId = req.params.id;

        const {amount, date, comment} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        let creditTransaction:any = await CreditTransaction.findById(transactionId);
        if(!creditTransaction) {
            return res.status(404).json({success, error: "Credit Transaction not found"});
        }

        if(creditTransaction?.user?.toString() !== userId) {
            return res.status(401).json({success, error: "Not allowed"});
        }

        creditTransaction = await CreditTransaction.findByIdAndUpdate(transactionId,{
            amount,
            date,
            comment,
        }, {new: true});

        let month:any = req.query.month;
        let year:any = req.query.year;

        if ((year && month) && (isNaN(Number(year)) || isNaN(Number(month)))) {
            return res.status(400).json({ error: "Invalid year or month parameter." });
        }

        if (!year) {
            year = new Date().getFullYear();
        }

        if (!month) {
            month = new Date().getMonth() + 1;
        }

        const startOfMonth = new Date(Number(year), Number(month) - 1, 1);
        const endOfMonth = new Date(Number(year), Number(month), 0);

        const filters: any = {
            user: userId,
            contact: creditTransaction?.contact?.toString(),
            date: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        };

        const creditTransactions:ICreditTransaction[] = await CreditTransaction.find(filters);

        success = true;
        return res.status(200).json({success, creditTransactions});
    } catch (error:any) {
        return res.status(500).json({success, error: error?.message});
    }
}

export default updateTransaction;