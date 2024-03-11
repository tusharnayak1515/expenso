import { Request, Response } from "express";
import Contact from "../../models/Contact";
import { IContact } from "../../entities/entityInterfaces";

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

        await Contact.findByIdAndDelete(contactId, {new: true});

        const contacts:IContact[] = await Contact.find({user: userId});

        success = true;
        return res.status(200).json({success, contacts});
    } catch (error: any) {
        return res.status(500).json({ success, error: error?.message });
    }
}

export default deleteContact;