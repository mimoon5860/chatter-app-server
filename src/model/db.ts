import { connect, model, Schema, models } from 'mongoose';
import { TUser, TFriend, TChat, TConversation } from '../utils/types/types';

class db {
  //database connection
  private dbConnect = async () => {
    try {
      connect(`mongodb://127.0.0.1:27017/chatter`, (err) => {
        if (err) {
          console.log({ err });
        } else {
          console.log("Database Connected");
        }
      });
    } catch (err) {
      console.log({ err });
    }
  }

  // user collection 
  public userCollection() {
    this.dbConnect();
    const userSchema = new Schema<TUser>({
      name: { type: String, required: true },
      phone: { type: String, required: true },
      password: { type: String, required: true },
      verified: { type: String, enum: ["verified", "unverified"], default: "unverified" },
      photo: { type: String, default: null },
    }, { timestamps: true });
    const Users = models.User || model<TUser>('User', userSchema);
    return Users;
  }

  // Friends collection
  public friendsCollection() {
    this.dbConnect();
    const friendsSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      friendId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
    const Friends = models.Friend || model<TFriend>('Friend', friendsSchema);
    return Friends;
  }

  // Conversations Collection
  public conversationCollection() {
    this.dbConnect();
    const conversationSchema = new Schema<TConversation>({
      creator: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
      },
      participant: [{
        type: Schema.Types.ObjectId, ref: 'User', required: true
      }],
      type: { type: String, enum: ['personal', 'group'], required: true },
      name: { type: String, default: null },
      coverImg: { type: String, default: null }
    }, { timestamps: true });
    const Conversation = models.Conversation || model<TConversation>('Conversation', conversationSchema);
    return Conversation;
  }

  // Chat collection
  public chatCollection() {
    this.dbConnect();
    const chatsSchema = new Schema<TChat>({
      message: { type: String, default: null },
      senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ['unread', "read"], default: "unread" },
      file: { type: [String], default: null },
      conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true }
    }, { timestamps: true });
    const Chats = models.Chat || model<TChat>('Chat', chatsSchema);
    return Chats;
  }
}

export default db;
