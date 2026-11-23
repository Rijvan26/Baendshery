const Conversation = require("../model/chat.model");
const Message = require("../model/message.model");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id || req.user._id;
    const receiverId = req.params.receiverId;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message text is required",
      });
    }

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required",
      });
    }

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    // Create conversation if not exists
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        lastMessage: text,
      });
    } else {
      conversation.lastMessage = text;
      await conversation.save();
    }

    // Save message
    const newMessage = await Message.create({
      conversationId: conversation._id,
      sender: senderId,
      receiver: receiverId,
      text,
    });

    // Real-time socket emission
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    const receiverSocketId = onlineUsers?.[String(receiverId)];

    console.log("=== SEND MESSAGE SOCKET DEBUG ===");
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);
    console.log("Current onlineUsers:", onlineUsers);
    console.log("Target receiverSocketId:", receiverSocketId);

    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Emitted newMessage event to socket:", receiverSocketId);
    } else {
      console.log("Could not emit: receiver is offline or socket not found");
    }

    return res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const senderId = req.user.id || req.user._id;
    const receiverId = req.params.receiverId;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required",
      });
    }

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      return res.status(200).json({
        success: true,
        messages: [],
      });
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get messages",
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
