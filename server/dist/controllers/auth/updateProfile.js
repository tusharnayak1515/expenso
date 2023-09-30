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
const formidable_1 = require("formidable");
const mv_1 = __importDefault(require("mv"));
const User_1 = __importDefault(require("../../models/User"));
const APP_URL = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "https://expenso-server.vercel.app";
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    try {
        let formData = new formidable_1.IncomingForm();
        const userId = req.body.user.id;
        formData.parse(req, function (error, fields, files) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    console.log("Error parsing form:", error);
                    return res.status(500).json({ success, error: "Error parsing form" });
                }
                if (Object.keys(fields).length === 0 && Object.keys(files).length === 0) {
                    return res
                        .status(422)
                        .json({ success, error: "Update profile body cannot be empty!" });
                }
                const name = (_a = fields === null || fields === void 0 ? void 0 : fields.name) === null || _a === void 0 ? void 0 : _a[0];
                const email = (_b = fields === null || fields === void 0 ? void 0 : fields.email) === null || _b === void 0 ? void 0 : _b[0];
                const dp = (_c = fields === null || fields === void 0 ? void 0 : fields.dp) === null || _c === void 0 ? void 0 : _c[0];
                let user = yield User_1.default.findById(userId).exec();
                let image = null;
                if (dp !== null && dp !== undefined) {
                    image = dp;
                }
                else {
                    for (const key of Object.keys(files)) {
                        const val = files[key];
                        const file = val[0];
                        const extension = file.originalFilename.substring(file.originalFilename.lastIndexOf("."));
                        // const myPath = path.join('uploads', file.newFilename + extension);
                        const myPath = `uploads/${file.newFilename + extension}`;
                        // const newPath = path.join('public', 'uploads', file.newFilename + extension);
                        const newPath = `public/uploads/${file.newFilename + extension}`;
                        if ((user === null || user === void 0 ? void 0 : user.dp) !== `${APP_URL}/${myPath}`) {
                            (0, mv_1.default)(file.filepath, newPath, (err) => {
                                if (err) {
                                    return;
                                }
                            });
                            image = `${APP_URL}/${myPath}`;
                        }
                        else {
                            image = user === null || user === void 0 ? void 0 : user.dp;
                        }
                    }
                }
                console.log("image: ", image);
                if (!image) {
                    image = (user === null || user === void 0 ? void 0 : user.dp) || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
                }
                user = yield User_1.default.findByIdAndUpdate(userId, { name, email, dp: image }, { new: true }).exec();
                success = true;
                return res.status(200).json({ success, user });
            });
        });
    }
    catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
});
exports.default = updateProfile;
//# sourceMappingURL=updateProfile.js.map