import express from "express";
import { contactSupport, getAllContacts } from "../controllers/contactSupport";
import { requireSignin, isAdmin } from "../middlewares/authentication";

const router = express.Router();

router.post("/contact", contactSupport);

// Admin: Get all contact messages
router.get("/messages", requireSignin, isAdmin, getAllContacts);

export default router;