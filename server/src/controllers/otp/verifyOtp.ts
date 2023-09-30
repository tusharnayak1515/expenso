import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../models/User";
import Token from "../../models/Token";

const verifyOtp = async (req:Request, res:Response)=> {
    let success = false;
    try {
        const {email,otp} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          success = false;
          return res.status(422).json({ success, error: errors.array()[0].msg});
        }

        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).json({success, error: "No user found with this email"});
        }
        
        let token = await Token.findOne({email: email});
        if(!token) {
            return res.status(404).json({success, error: "Token not found"});
        }

        if(token.otp !== parseInt(otp)) {
            return res.status(401).json({success, error: "Incorrect OTP"});
        }

        token = await Token.findByIdAndDelete(token._id.toString(), {new: true});

        success = true;
        return res.status(200).json({success});

    } catch (error:any) {
        return res.status(500).json({success, error: error.message});
    }
}

export default verifyOtp;