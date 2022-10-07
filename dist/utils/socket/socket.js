"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServer = exports.io = void 0;
const socket_io_1 = require("socket.io");
const socketServer = (httpServer) => {
    exports.io = new socket_io_1.Server(httpServer);
};
exports.socketServer = socketServer;
//# sourceMappingURL=socket.js.map