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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = ({ subject, text, html, email }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("email: ", email);
    const mailOptions = {
        from: process.env.NODE_MAILER_EMAIL,
        to: email,
        subject,
        text,
        html,
    };
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.NODE_MAILER_EMAIL,
                pass: process.env.NODE_MAILER_PASSWORD
            }
        });
        yield new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });
        yield new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(info);
                }
            });
        });
    }
    catch (error) {
        console.log(`Nodemailer error: ${error}`);
    }
});
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map