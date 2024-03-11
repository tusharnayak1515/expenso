import express from "express";
import fetchUser from "../middlewares/fetchUser";
import getMyContacts from "../controllers/contact/getMyContacts";
import addContact from "../controllers/contact/addContact";
import updateContact from "../controllers/contact/updateContact";
import { body } from "express-validator";
import deleteContact from "../controllers/contact/deleteContact";
import getContact from "../controllers/contact/getContact";

const router = express.Router();

router.get("/", fetchUser, getMyContacts);
router.get("/:id", fetchUser, getContact);

router.post("/", [
    body("name","Contact name cannot be empty").isLength({min: 3}),
    body("type", "Invalid Contact Type").isIn(["store","person"]),
    body("phone", "Invalid phone number").isLength({min: 10, max: 10})
], fetchUser, addContact);

router.put("/:id", [
    body("name","Contact name cannot be empty").isLength({min: 3}),
    body("type", "Invalid Contact Type").isIn(["store","person"]),
    body("phone", "Invalid phone number").isLength({min: 10, max: 10})
], fetchUser, updateContact);

router.delete("/:id", fetchUser, deleteContact);

export default router;