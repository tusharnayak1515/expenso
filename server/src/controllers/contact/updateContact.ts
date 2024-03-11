import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Contact from "../../models/Contact";
import { IContact } from "../../entities/entityInterfaces";

const updateContact = async (req: Request, res: Response) => {
    let success = false;
    try {
        const userId = req.body.user.id;
        const contactId = req.params.id;

        const { name, type, phone } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        let contact:any = await Contact.findById(contactId);
        if(!contact) {
            return res.status(404).json({success, error: "Contact not found"});
        }

        if(contact?.user?.toString() !== userId) {
            return res.status(401).json({success, error: "Not allowed"});
        }

        contact = await Contact.findByIdAndUpdate(contactId, {
            name,
            type,
            phone
        }, {new: true});

        const contacts:IContact[] = await Contact.find({user: userId});

        success = true;
        return res.status(200).json({success, contacts});
    } catch (error: any) {
        return res.status(500).json({ success, error: error?.message });
    }
}

export default updateContact;