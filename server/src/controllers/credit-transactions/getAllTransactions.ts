import { Request, Response } from "express";
import Contact from "../../models/Contact";
import { ICreditTransaction } from "../../entities/entityInterfaces";
import CreditTransaction from "../../models/CreditTransaction";

const getAllTransactions = async(req: Request, res: Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;
        const contactId = req.params.id;

        const contact:any = await Contact.findById(contactId);
        if(!contact) {
            return res.status(404).json({success, error: "Contact not found"});
        }

        if(contact?.user?.toString() !== userId) {
            return res.status(401).json({success, error: "Not allowed"});
        }

        const filters: any = {
            user: userId,
            contact: contactId
        };

        const creditTransactions:ICreditTransaction[] = await CreditTransaction.find(filters);

        success = true;
        return res.status(200).json({success, creditTransactions});
    } catch (error:any) {
        return res.status(500).json({success, error: error?.message});
    }
}

export default getAllTransactions;