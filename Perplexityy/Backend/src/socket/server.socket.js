import {Server} from "socket.io"

let io;

export function initSocketServer (httpServer) {
    io = new Server(httpServer,{
        cors: {
    origin: "https://perplexity-phi-mauve.vercel.app",
        credentials: true,
    }
      
    })

    console.log("socket server is running")

    io.on("connection",(socket) => {
        console.log("A user Conneted" + socket.id)
    })

}
    export function getIo() {
        if(!io) {
            throw new Error ("socket.io not initialized")
        }
        return io
    }
   
