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
    const Users = models.Users || model<TUser>('Users', userSchema);
    return Users;
  }

  // Friends collection
  public friendsCollection() {
    this.dbConnect();
    const friendsSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
      friendId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
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
    const Friends = models.Friends || model<TFriend>('Friends', friendsSchema);
    return Friends;
  }

  // Conversations Collection
  public conversationCollection() {
    this.dbConnect();
    const conversationSchema = new Schema<TConversation>({
      creator: {
        type: Schema.Types.ObjectId, ref: 'Users', required: true
      },
      participant: [{
        type: Schema.Types.ObjectId, ref: 'Users', required: true
      }],
    }, { timestamps: true });
    const Conversations = models.Conversations || model<TConversation>('Conversations', conversationSchema);
    return Conversations;
  }

  // Chat collection
  public chatCollection() {
    this.dbConnect();
    const chatsSchema = new Schema<TChat>({
      message: { type: String, default: null },
      senderId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
      receiverId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
      status: { type: String, enum: ['unread', "read"], default: "unread" },
      file: { type: [String], default: null },
      conversation: { type: Schema.Types.ObjectId, ref: "Conversations", required: true }
    }, { timestamps: true });
    const Chats = models.Chats || model<TChat>('Chats', chatsSchema);
    return Chats;
  }
}

export default db;
