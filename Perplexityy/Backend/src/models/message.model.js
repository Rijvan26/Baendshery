import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Message must belong to a chat'],
    },
    content: {
      type: String,
      required: [true, 'Please provide message content'],
    },
    role: {
      type: String,
      enum: ['user', 'ai'],
      required: [true, 'Please specify the role (user or ai)'],
    },
  },
  { timestamps: true }
);

export const messageModel = mongoose.model('Message', messageSchema);
