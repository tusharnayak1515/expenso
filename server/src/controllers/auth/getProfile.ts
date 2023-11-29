import { Request, Response } from "express";
import User from "../../models/User";

const secret = process.env.JWT_SECRET;

const getProfile = async (req: Request, res: Response) => {
  let success = false;
  try {
    const userId= req.body.user.id;

    let user: any = await User.findById(userId).exec();
    if (!user) {
      return res
        .status(404)
        .json({
          success,
          error: "User not found",
        });
    }

    user = await User.findById(userId).select("-password");

    success = true;
    return res.status(200).json({ success, user });
  } catch (error: any) {
    return res.status(500).json({ success, error: error.message });
  }
};

export default getProfile;
