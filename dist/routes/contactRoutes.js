"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactSupport_1 = require("../controllers/contactSupport");
const authentication_1 = require("../middlewares/authentication");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact support and messages
 */
/**
 * @swagger
 * /support/contact:
 *   post:
 *     summary: Send a contact/support message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               subject:
 *                 type: string
 *                 description: Subject of the message
 *               message:
 *                 type: string
 *                 description: Message body
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post("/contact", contactSupport_1.contactSupport);
/**
 * @swagger
 * /support/messages:
 *   get:
 *     summary: Get all contact messages (admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contact messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactMessage'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.get("/messages", authentication_1.requireSignin, authentication_1.isAdmin, contactSupport_1.getAllContacts);
exports.default = router;
