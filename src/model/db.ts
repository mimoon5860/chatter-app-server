import { connect, model, Schema, models } from 'mongoose';
import { TUser, TFriend, TChat } from '../utils/types/types';

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

  public chatCollection() {
    this.dbConnect();
    const chatsSchema = new Schema<TChat>({
      message: { type: String },
      senderId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
      receiverId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
      status: { type: String, enum: ['unread', "read"], required: true, default: "unread" }
    }, { timestamps: true });
    const Chats = models.Chats || model<TChat>('Chats', chatsSchema);
    return Chats;
  }
}

export default db;
