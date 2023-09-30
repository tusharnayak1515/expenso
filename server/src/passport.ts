import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./models/User";
import sendEmail from "./services/sendEmail";

const secret = process.env.JWT_SECRET;

const app = express();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
            callbackURL: "/api/auth/google/callback",
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, callback) {
            const user = {
                id: profile?.id,
                name: profile?.displayName,
                email: profile?.emails ? profile?.emails[0]?.value : "email@gmail.com",
            };

            let isUser: any = await User.findOne({ $or: [{ googleId: user?.id }, { email: user?.email }] }).exec();
            if (!isUser) {
                const tempPassword = `Default${user?.id}@`;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(tempPassword, salt);
                const newUser: any = await User.create({
                    name: user?.name,
                    email: user?.email,
                    password: hashedPassword,
                    googleId: user?.id
                });

                const data: any = {
                    user: {
                        id: newUser?.id
                    },
                };

                const jwtToken = jwt.sign(data, secret!);

                await sendEmail({
                    subject: "Congratulations! Your expenso account has been created.",
                    text: `Password: ${tempPassword} . Please login to your account and update the password`,
                    email: user?.email,
                });

                callback(null, { token: jwtToken, user: newUser });
            }

            isUser = await User.findByIdAndUpdate(isUser?._id, { googleId: user?.id }, { new: true });

            const data: any = {
                user: {
                    id: isUser?.id
                },
            };

            const jwtToken = jwt.sign(data, secret!);

            callback(null, { token: jwtToken, user: isUser });
        }
    )
);

passport.serializeUser((user: any, done: any) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: any, user: any) => {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

export default passport;