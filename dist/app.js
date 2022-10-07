"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const allRouters_1 = __importDefault(require("./routers/allRouters"));
const morgan_1 = __importDefault(require("morgan"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = require("./utils/socket/socket");
const path_1 = __importDefault(require("path"));
const mongoose_1 = require("mongoose");
class App {
    constructor(port) {
        this.origin = [
            'http://localhost:3000',
        ];
        //database connection
        this.dbConnect = () => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, mongoose_1.connect)(`mongodb://127.0.0.1:27017/chatter`, (err) => {
                    if (err) {
                        console.log({ err });
                    }
                    else {
                        console.log("Database Connected");
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        });
        this.app = (0, express_1.default)();
        this.port = port;
        this.httpServer = (0, http_1.createServer)(this.app);
        (0, socket_1.socketServer)(this.httpServer);
        this.dbConnect();
        this.initMiddlewares();
        this.sendFiles();
        this.startingRouters(new allRouters_1.default());
        this.errorHandle();
    }
    initMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: this.origin, credentials: true }));
        this.app.use((0, morgan_1.default)('tiny'));
        this.app.use((0, cookie_parser_1.default)());
    }
    startingRouters(routers) {
        this.app.get('/', (_req, res) => {
            res.send('Server is running bro chill!');
        });
        socket_1.io.on("connection", (socket) => {
            console.log('Socket Connected. id: ' + socket.id);
        });
        // auth router 
        this.app.use('/api/auth', routers.authRouter);
        // user router
        this.app.use('/api/user', routers.userRouter);
        // friend activity router 
        this.app.use('/api/friend', routers.friendRouter);
        // chatting router 
        this.app.use('/api/chats', routers.chatRouter);
        // conversation routers 
        this.app.use('/api/conversation', routers.conversationRouter);
        this.app.use(new notFound_1.default().notFound);
    }
    sendFiles() {
        this.app.get('/get/image/:folder/:filename', (req, res) => {
            const { folder, filename } = req.params;
            res.sendFile(path_1.default.resolve(`${__dirname}/uploads/${folder}/${filename}`));
        });
    }
    errorHandle() {
        this.app.use(new errorHandler_1.default().error);
    }
    listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server is running at port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map