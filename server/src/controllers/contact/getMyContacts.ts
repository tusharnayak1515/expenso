import { Request, Response } from "express";
import { IContact } from "../../entities/entityInterfaces";
import Contact from "../../models/Contact";

const getMyContacts = async(req:Request, res:Response)=> {
    let success = false;
    try {
        const userId = req.body.user.id;

        const contacts:IContact[] = await Contact.find({user: userId});

        success = true;
        return res.status(200).json({success, contacts});
    } catch (error:any) {
        return res.status(500).json({success, error: error?.message});
    }
}

export default getMyContacts;