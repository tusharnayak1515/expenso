import express, { Request, Response } from "express";
import signup from "../controllers/auth/signup";
import signin from "../controllers/auth/signin";
import fetchUser from "../middlewares/fetchUser";
import changedPassword from "../controllers/auth/changePassword";
import resetPassword from "../controllers/auth/resetPassword";
import updateProfile from "../controllers/auth/updateProfile";
import passport from "passport";
import getProfile from "../controllers/auth/getProfile";

const router = express.Router();

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "Successfully Logged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        error: "Log in failure",
    });
});

router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", (err: any, authInfo: any) => {
            if (err) {
                return res.redirect('/api/auth/login/failed');
            }

            const token = `Bearer ${authInfo?.token}`;
            const user = authInfo?.user;
            const isNewUser = authInfo?.isNewUser;

            if (isReactNativeApp(req)) {
                const redirectUrl = `exp://192.168.0.194:8081/--/?token=${token}&user=${JSON.stringify(user)}`;
                res.send(`<script>window.location.replace("${redirectUrl}")</script>`);

            } else {
                // For Next.js, set cookie and redirect
                res.cookie("authorization", token, {
                    maxAge: 60 * 60 * 24 * 1000 * 7,
                    path: "/",
                    httpOnly: process.env.NODE_ENV === "production" ? true : false,
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                    secure: process.env.NODE_ENV === "production" ? true : false
                });

                const FRONTEND_URL = process.env.NODE_ENV ===
                    "production" ?
                    `https://expenso-jet.vercel.app/token?token=${token}&isNewUser=${isNewUser}` :
                    `${process.env.CLIENT_URL}/token?token=${token}&isNewUser=${isNewUser}`;

                res.redirect(FRONTEND_URL!);
            }
        })(req, res, next);
    }
);

export const isReactNativeApp = (req: Request) => {
    console.log("agent: ", req.headers["user-agent"]);
    return req.headers["user-agent"]?.includes("okhttp/4.9.2") || false;
}

router.post('/logout', function (req: any, res: any, next) {
    try {
        // req.logout(req.user, function (err: any) {
        //     if (err) { return next(err); }
        // });
        res.cookie("authorization", null, {
            maxAge: 0,
            path: "/",
            httpOnly: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV === "production" ? true : false,
        });

        const FRONTEND_URL = process.env.NODE_ENV === "production" ? "https://expenso-jet.vercel.app" : process.env.CLIENT_URL;
        res.redirect(FRONTEND_URL!);
    } catch (error) {
        console.log(error);
    }
});

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", fetchUser, getProfile);
router.put("/update-profile", fetchUser, updateProfile);
router.put("/change-password", fetchUser, changedPassword);
router.put("/reset-password", resetPassword);

export default router;
