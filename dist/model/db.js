"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class db {
    // user collection 
    userCollection() {
        const userSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: null },
            password: { type: String, required: true },
            verified: { type: String, enum: ["verified", "unverified"], default: "unverified" },
            photo: { type: String, default: null },
        }, { timestamps: true });
        const Users = mongoose_1.models.User || (0, mongoose_1.model)('User', userSchema);
        return Users;
    }
    // Friends collection
    friendsCollection() {
        const friendsSchema = new mongoose_1.Schema({
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, alias: 'friendsId' },
            friendId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, alias: 'friendsId' },
            type: {
                type: String,
                enums: [
                    "friend",
                    "blocked",
                    "requested",
                ], required: "Type will be friend blocked or requested"
            },
            note: { type: String, default: null }
        }, { timestamps: true });
        const Friends = mongoose_1.models.Friend || (0, mongoose_1.model)('Friend', friendsSchema);
        return Friends;
    }
    // Conversations Collection
    conversationCollection() {
        const conversationSchema = new mongoose_1.Schema({
            creator: {
                type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true
            },
            participant: [{
                    type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true
                }],
            type: { type: String, enum: ['personal', 'group'], required: true },
            lastMsg: { type: String, default: null },
            name: { type: String, default: null },
            coverImg: { type: String, default: null }
        }, { timestamps: true });
        const Conversation = mongoose_1.models.Conversations || (0, mongoose_1.model)('Conversations', conversationSchema);
        return Conversation;
    }
    // Chat collection
    chatCollection() {
        const chatsSchema = new mongoose_1.Schema({
            message: { type: String, default: null },
            senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            status: { type: String, enum: ['unread', "read"], default: "unread" },
            file: { type: [String], default: null },
            conversation: { type: mongoose_1.Schema.Types.ObjectId, ref: "Conversation", required: true }
        }, { timestamps: true });
        const Chats = mongoose_1.models.Chats || (0, mongoose_1.model)('Chats', chatsSchema);
        return Chats;
    }
}
exports.default = db;
//# sourceMappingURL=db.js.map