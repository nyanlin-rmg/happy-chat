import e from "express";
import { getAllContacts, getChatPartners, getMessageByUserId, sendMessage, getLatestMessage } from "../controllers/message.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../lib/fileupload.js";

const router = e.Router();

router.use(protectedRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/chats/latest-message/:partnerId", getLatestMessage);
router.get("/get-messages/:userId", getMessageByUserId);
router.post("/send/:receiverId", upload.single('image'), sendMessage);

export default router;