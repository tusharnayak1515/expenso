"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../controllers/auth/signup"));
const signin_1 = __importDefault(require("../controllers/auth/signin"));
const fetchUser_1 = __importDefault(require("../middlewares/fetchUser"));
const changePassword_1 = __importDefault(require("../controllers/auth/changePassword"));
const resetPassword_1 = __importDefault(require("../controllers/auth/resetPassword"));
const updateProfile_1 = __importDefault(require("../controllers/auth/updateProfile"));
const passport_1 = __importDefault(require("passport"));
const getProfile_1 = __importDefault(require("../controllers/auth/getProfile"));
const router = express_1.default.Router();
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "Successfully Logged In",
            user: req.user,
        });
    }
    else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        error: "Log in failure",
    });
});
router.get("/google", passport_1.default.authenticate("google"));
router.get("/google/callback", (req, res, next) => {
    passport_1.default.authenticate("google", (err, authInfo) => {
        if (err) {
            return res.redirect('/api/auth/login/failed');
        }
        const token = `Bearer ${authInfo === null || authInfo === void 0 ? void 0 : authInfo.token}`;
        const user = authInfo === null || authInfo === void 0 ? void 0 : authInfo.user;
        res.cookie("authorization", token, {
            maxAge: 60 * 60 * 24 * 1000,
            path: "/",
            httpOnly: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV === "production" ? true : false
        });
        // res.status(200).json({ success: true, token, user });
        const FRONTEND_URL = process.env.NODE_ENV === "production" ? `https://expenso-jet.vercel.app?token=${token}` : process.env.CLIENT_URL;
        res.redirect(FRONTEND_URL);
    })(req, res, next);
});
router.get("/logout", (req, res) => {
    req.logout(() => {
        console.log("Logout successfull");
    });
    const FRONTEND_URL = process.env.NODE_ENV === "production" ? "https://expenso-jet.vercel.app" : process.env.CLIENT_URL;
    res.redirect(FRONTEND_URL);
});
router.post("/signup", signup_1.default);
router.post("/signin", signin_1.default);
router.get("/profile", fetchUser_1.default, getProfile_1.default);
router.put("/update-profile", fetchUser_1.default, updateProfile_1.default);
router.put("/change-password", fetchUser_1.default, changePassword_1.default);
router.put("/reset-password", resetPassword_1.default);
exports.default = router;
//# sourceMappingURL=auth.js.map