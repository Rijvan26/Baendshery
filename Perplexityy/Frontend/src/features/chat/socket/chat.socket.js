import { io } from "socket.io-client";

export const intialSocketConnection = () => {
    const socket = io("http://localhost:3000", {
        withCredentials: true,
    })

    socket.on("connect", () => {
       console.log("connted to socket server")
    })
}

