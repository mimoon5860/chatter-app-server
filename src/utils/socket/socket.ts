import { Server as SocketServer } from "socket.io";
import { Server } from 'http';

export let io: SocketServer;
export const socketServer = (httpServer: Server) => {
    io = new SocketServer(httpServer);
}