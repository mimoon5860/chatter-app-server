import { connect, model, Schema, models } from 'mongoose';
import { TUser, TFriend } from '../utils/types/types';

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
    const friendsSchema = new Schema<TFriend>({
      userId: { type: Schema.Types.ObjectId, ref: 'Users' },
      friendId: { type: Schema.Types.ObjectId, ref: 'Users' },
      type: {
        type: String,
        enums: [
          "friend",
          "blocked",
          "requested",
        ]
      },
      note: { type: String, default: null }

    }, { timestamps: true });
    const Friends = models.Friends || model<TFriend>('Friends', friendsSchema);
    return Friends;
  }
}

export default db;
