import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { IUser } from "../../entities/entityInterfaces";

const secret = process.env.JWT_SECRET;

const getProfile = async (req: Request, res: Response) => {
  let success = false;
  try {
    const userId= req.body.user.id;

    let user: IUser | null = await User.findById(userId).exec();
    if (!user) {
      return res
        .status(404)
        .json({
          success,
          error: "User not found",
        });
    }

    success = true;
    return res.status(200).json({ success, user });
  } catch (error: any) {
    console.log("error: ",error);
    return res.status(500).json({ success, error: error.message });
  }
};

export default getProfile;