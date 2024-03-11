import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Contact from "../../models/Contact";
import { IContact } from "../../entities/entityInterfaces";

const addContact = async (req: Request, res: Response) => {
    let success = false;
    try {
        const userId = req.body.user.id;

        const { name, type, phone } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        await Contact.create({
            name,
            type,
            phone,
            user: userId
        });

        const contacts:IContact[] = await Contact.find({user: userId});

        success = true;
        return res.status(201).json({success, contacts});
    } catch (error: any) {
        return res.status(500).json({ success, error: error?.message });
    }
}

export default addContact;