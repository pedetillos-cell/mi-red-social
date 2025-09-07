import { Server as NetServer } from "http";
import { Server as SocketServer } from "socket.io";
import { NextApiResponse } from "next";

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function SocketHandler(_req: any, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    const io = new SocketServer(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Usuario conectado:", socket.id);

      // Unirse a una sala de usuario
      socket.on("join-user-room", (userId: string) => {
        socket.join(`user-${userId}`);
        console.log(`Usuario ${userId} unido a su sala`);
      });

      // Notificación de nuevo seguidor
      socket.on("new-follower", (data: { userId: string; follower: string }) => {
        socket.to(`user-${data.userId}`).emit("notification", {
          type: "follow",
          message: `@${data.follower} empezó a seguirte`,
          timestamp: new Date().toISOString(),
        });
      });

      // Notificación de nuevo like
      socket.on("new-like", (data: { userId: string; user: string; video: string }) => {
        socket.to(`user-${data.userId}`).emit("notification", {
          type: "like",
          message: `A @${data.user} le gustó tu video`,
          timestamp: new Date().toISOString(),
        });
      });

      // Notificación de nuevo comentario
      socket.on("new-comment", (data: { userId: string; user: string; video: string }) => {
        socket.to(`user-${data.userId}`).emit("notification", {
          type: "comment",
          message: `@${data.user} comentó en tu video`,
          timestamp: new Date().toISOString(),
        });
      });

      socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
      });
    });
  }
  res.end();
}