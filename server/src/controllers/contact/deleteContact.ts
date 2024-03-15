import { Request, Response } from "express";
import Contact from "../../models/Contact";
import { IContact, ICreditTransaction } from "../../entities/entityInterfaces";
import CreditTransaction from "../../models/CreditTransaction";
import Expense from "../../models/Expense";

const deleteContact = async (req: Request, res: Response) => {
    let success = false;
    try {
        const userId = req.body.user.id;
        const contactId = req.params.id;

        let contact:any = await Contact.findById(contactId);
        if(!contact) {
            return res.status(404).json({success, error: "Contact not found"});
        }

        if(contact?.user?.toString() !== userId) {
            return res.status(401).json({success, error: "Not allowed"});
        }

        const transactions:ICreditTransaction[] = await CreditTransaction.find({contact: contactId});

        const transactionIds = transactions?.map((obj:any)=> obj?._id?.toString());
        
        await Expense.deleteMany({
            transactions: {
              $in: transactionIds,
            },
        });

        await CreditTransaction.deleteMany({contact: contactId});

        await Contact.findByIdAndDelete(contactId, {new: true});

        const contacts:IContact[] = await Contact.find({user: userId});

        success = true;
        return res.status(200).json({success, contacts});
    } catch (error: any) {
        return res.status(500).json({ success, error: error?.message });
    }
}

export default deleteContact;