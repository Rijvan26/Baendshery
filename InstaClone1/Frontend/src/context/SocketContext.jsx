import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../feature/auth/auth.context";

export const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const userId = user?._id || user?.id || "";

    const newSocket = io("http://localhost:3000", {
      query: {
        userId,
      },
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server. Socket ID:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (users) => {
      console.log("Online users list received:", users);
      setOnlineUsers(users);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
    });

    return () => {
      newSocket.close();
    };
  }, [user?._id, user?.id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
