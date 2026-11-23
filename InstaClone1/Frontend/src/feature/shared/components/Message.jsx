import React, { useState, useEffect, useRef } from "react";
import "../message.scss";
import { useAuth } from "../../auth/hooks/userAuth";
import { useSocket } from "../../../context/SocketContext";
import { getMessages, sendMessage } from "../../message/services/message.api";

const MessagePage = () => {
  const { user, suggestedUsers, handleSuggestion } = useAuth();
  const { socket, onlineUsers } = useSocket();

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const selectedUserRef = useRef(null);

  // Keep selectedUserRef always updated to avoid stale closures in socket events
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  // Load suggestions to show as chat contacts if not loaded yet
  useEffect(() => {
    if (suggestedUsers.length === 0) {
      handleSuggestion();
    }
  }, []);

  // Fetch conversation history when selecting a user
  useEffect(() => {
    if (!selectedUser) return;

    const fetchChat = async () => {
      setLoadingMessages(true);
      try {
        const res = await getMessages(selectedUser._id);
        setMessages(res.messages || []);
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchChat();
  }, [selectedUser]);

  // Real-time listener for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("🔥 [Socket] Real-time newMessage received:", newMessage);

      const activeUser = selectedUserRef.current;
      const incomingSenderId = String(newMessage.sender?._id || newMessage.sender);
      const activeChatUserId = String(activeUser?._id || activeUser?.id || "");

      console.log("Checking match:", { incomingSenderId, activeChatUserId });

      // Append if the message is from the user currently open in the chat window
      if (activeChatUserId && incomingSenderId === activeChatUserId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedUser) return;

    const text = inputMessage.trim();
    setInputMessage("");

    try {
      const res = await sendMessage(selectedUser._id, text);
      if (res.success && res.message) {
        setMessages((prev) => [...prev, res.message]);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const isUserOnline = (userId) => {
    return Array.isArray(onlineUsers) && onlineUsers.includes(userId);
  };

  const myId = user?._id || user?.id;

  return (
    <div className="chat-layout">
      {/* Sidebar: Conversation / User list */}
      <div className="chat-sidebar">
        <div className="chat-sidebar__header">
          <h2>Messages</h2>
          <span className="chat-sidebar__username">{user?.username}</span>
        </div>

        <div className="chat-sidebar__list">
          {suggestedUsers && suggestedUsers.length > 0 ? (
            suggestedUsers.map((u) => {
              const online = isUserOnline(u._id);
              const isSelected = selectedUser?._id === u._id;
              return (
                <div
                  key={u._id}
                  className={`chat-user-item ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedUser(u)}
                >
                  <div className="chat-user-item__avatar-wrapper">
                    <img
                      src={u.profilePic || "https://ik.imagekit.io/nnxrkxddlh/74a3b6a8856b004dfff824ae9668fe9b.webp"}
                      alt={u.username}
                      className="chat-user-item__avatar"
                    />
                    {online && <span className="online-indicator"></span>}
                  </div>
                  <div className="chat-user-item__info">
                    <span className="chat-user-item__name">{u.username}</span>
                    <span className="chat-user-item__status">
                      {online ? "Active now" : "Offline"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="chat-sidebar__empty">No contacts found</div>
          )}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="chat-main">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header__user">
                <div className="chat-header__avatar-wrapper">
                  <img
                    src={selectedUser.profilePic || "https://ik.imagekit.io/nnxrkxddlh/74a3b6a8856b004dfff824ae9668fe9b.webp"}
                    alt={selectedUser.username}
                  />
                  {isUserOnline(selectedUser._id) && (
                    <span className="online-indicator"></span>
                  )}
                </div>
                <div>
                  <h3>{selectedUser.username}</h3>
                  <span className="chat-header__status">
                    {isUserOnline(selectedUser._id) ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Body */}
            <div className="chat-messages">
              {loadingMessages ? (
                <div className="chat-status">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="chat-status">
                  No messages yet. Say hello to {selectedUser.username}! 👋
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isSentByMe = msg.sender === myId;
                  return (
                    <div
                      key={msg._id || index}
                      className={`message-bubble-wrapper ${
                        isSentByMe ? "sent" : "received"
                      }`}
                    >
                      <div className="message-bubble">{msg.text}</div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form className="chat-input-bar" onSubmit={handleSend}>
              <input
                type="text"
                placeholder="Message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="send-btn"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="chat-empty-state">
            <div className="chat-empty-state__icon">
              <i className="ri-messenger-line"></i>
            </div>
            <h2>Your Messages</h2>
            <p>Send private messages and real-time replies to friends.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
