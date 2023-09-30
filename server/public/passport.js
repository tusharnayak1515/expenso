"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("./models/User"));
const sendEmail_1 = __importDefault(require("./services/sendEmail"));
const secret = process.env.JWT_SECRET;
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ["profile", "email"],
}, function (accessToken, refreshToken, profile, callback) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            id: profile === null || profile === void 0 ? void 0 : profile.id,
            name: profile === null || profile === void 0 ? void 0 : profile.displayName,
            email: (profile === null || profile === void 0 ? void 0 : profile.emails) ? (_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value : "email@gmail.com",
        };
        const isUser = yield User_1.default.findOne({ $or: [{ googleId: user === null || user === void 0 ? void 0 : user.id }, { email: user === null || user === void 0 ? void 0 : user.email }] }).exec();
        if (!isUser) {
            const tempPassword = `Default${user === null || user === void 0 ? void 0 : user.id}@`;
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(tempPassword, salt);
            const newUser = yield User_1.default.create({
                name: user === null || user === void 0 ? void 0 : user.name,
                email: user === null || user === void 0 ? void 0 : user.email,
                password: hashedPassword,
                googleId: user === null || user === void 0 ? void 0 : user.id
            });
            const data = {
                user: {
                    id: newUser === null || newUser === void 0 ? void 0 : newUser.id
                },
            };
            const jwtToken = jsonwebtoken_1.default.sign(data, secret);
            yield (0, sendEmail_1.default)({
                subject: "Congratulations! Your expenso account has been created.",
                text: `Password: ${tempPassword} . Please login to your account and update the password`,
                email: user === null || user === void 0 ? void 0 : user.email,
            });
            callback(null, { token: jwtToken, user: newUser });
        }
        const data = {
            user: {
                id: isUser === null || isUser === void 0 ? void 0 : isUser.id
            },
        };
        const jwtToken = jsonwebtoken_1.default.sign(data, secret);
        callback(null, { token: jwtToken, user: isUser });
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=passport.js.map