import { Request, Response } from "express";
import Contact from "../../models/Contact";
import { validationResult } from "express-validator";
import CreditTransaction from "../../models/CreditTransaction";
import { ICreditTransaction } from "../../entities/entityInterfaces";
import Expense from "../../models/Expense";

const markAsPaid = async (req: Request, res: Response) => {
    let success = false;
    try {
        const userId = req.body.user.id;
        const contactId = req.params.id;

        const { fromDate, toDate, paymentDate } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        const contact: any = await Contact.findById(contactId);
        if (!contact) {
            return res.status(404).json({ success, error: "Contact not found" });
        }

        if (contact?.user?.toString() !== userId) {
            return res.status(401).json({ success, error: "Not allowed" });
        }

        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        let filters: any = {
            user: userId,
            contact: contactId,
            date: {
                $gte: startDate,
                $lte: endDate,
            },
            paymentStatus: "pending"
        };

        let matchedTransactions: ICreditTransaction[] = await CreditTransaction.find(filters);

        await CreditTransaction.updateMany(filters, {
            $set: {
                paymentStatus: "paid",
                paymentDate: new Date(paymentDate),
            }
        });

        let amount = matchedTransactions.reduce((res: any, cur: ICreditTransaction) => {
            return res + cur?.amount
        }, 0);

        if(matchedTransactions?.length > 0) {
            await Expense.create({
                amount,
                category: "6503d4c85065a2de0df7df10",
                expenseType: "debit",
                comment: `Due amount paid to Contact: ${contact?.name} for ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
                expenseDate: new Date(paymentDate),
                user: userId,
                transactions: [...matchedTransactions?.map((obj:any)=> obj?._id?.toString())]
            });
        }

        let month: any = req.query.month;
        let year: any = req.query.year;

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

        filters = {
            user: userId,
            contact: contactId,
            date: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        };

        const creditTransactions: ICreditTransaction[] = await CreditTransaction.find(filters);

        success = true;
        return res.status(200).json({ success, creditTransactions });
    } catch (error: any) {
        return res.status(500).json({ success, error: error?.message });
    }
}

export default markAsPaid;