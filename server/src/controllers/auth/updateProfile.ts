import { Request, Response } from "express";
import { Files, Fields, IncomingForm } from "formidable";
import mv from "mv";
import { IUser } from "../../entities/entityInterfaces";
import User from "../../models/User";

const APP_URL = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "";

const updateProfile = async (req: Request, res: Response) => {
    let success = false;
    try {
        let formData = new IncomingForm();
        const userId = req.body.user.id;
        formData.parse(req, async function (error, fields: Fields, files: Files) {
            if (error) {
                console.log("Error parsing form:", error);
                return res.status(500).json({ success, error: "Error parsing form" });
            }
            if (Object.keys(fields).length === 0 && Object.keys(files).length === 0) {
                return res
                    .status(422)
                    .json({ success, error: "Update profile body cannot be empty!" });
            }

            const name = fields?.name?.[0];
            const email = fields?.email?.[0];
            const dp = fields?.dp?.[0];

            let user : IUser | null = await User.findById(userId).exec();

            let image: string | any = null;

            if(dp !== null && dp !== undefined) {
                image = dp;
            }
            else {
                for (const key of Object.keys(files)) {
                    const val: any = files[key];
                    const file: any = val[0];
                    const extension = file.originalFilename.substring(
                      file.originalFilename.lastIndexOf(".")
                    );
            
                    const path = file.newFilename + extension;
                    const newPath = "src/uploads/" + path;
    
                    if(user?.dp !== `${APP_URL}/${newPath}`) {
                        mv(file.filepath, newPath, (err) => {
                          if (err) {
                            return;
                          }
                        });
                
                        image = `${APP_URL}/${newPath}`;
                    }
                    else {
                        image = user?.dp;
                    }
                }
            }

            if(!image) {
                image = user?.dp || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
            }

            user = await User.findByIdAndUpdate(userId, {name,email,dp:image}, {new: true}).exec();

            success = true;
            return res.status(200).json({ success, user });
        });
    } catch (error: any) {
        return res.status(500).json({ success, error: error.message });
    }
}

export default updateProfile;