import { Request, Response } from "express";
import Contact from "../../models/Contact";
import { validationResult } from "express-validator";
import CreditTransaction from "../../models/CreditTransaction";
import { ICreditTransaction } from "../../entities/entityInterfaces";

const addTransaction = async(req: Request, res: Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const contactId = req.params.id;

        const {amount, date, comment} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        const contact:any = await Contact.findById(contactId);
        if(!contact) {
            return res.status(404).json({success, error: "Contact not found"});
        }

        if(contact?.user?.toString() !== userId) {
            return res.status(401).json({success, error: "Not allowed"});
        }

        await CreditTransaction.create({
            amount,
            date,
            comment,
            paymentStatus: "pending",
            contact: contactId,
            user: userId
        });

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
            contact: contactId,
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

export default addTransaction;