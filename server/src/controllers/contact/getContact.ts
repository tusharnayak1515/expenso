import { Request, Response } from "express";
import { IContact } from "../../entities/entityInterfaces";
import Contact from "../../models/Contact";

const getContact = async(req:Request, res:Response)=> {
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

        success = true;
        return res.status(200).json({success, contact});
    } catch (error:any) {
        return res.status(500).json({success, error: error?.message});
    }
}

export default getContact;