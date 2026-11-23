const express = require("express");
const identifyUser = require("../middleware/auth.middleware");
const messageController = require("../controller/message.controller");

const messageRouter = express.Router();

messageRouter.get("/:receiverId", identifyUser, messageController.getMessages);
messageRouter.post("/send/:receiverId", identifyUser, messageController.sendMessage);

module.exports = messageRouter;
