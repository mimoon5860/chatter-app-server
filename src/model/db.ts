import { connect, model, Schema, models } from 'mongoose';
import { IUser } from '../utils/types/types';

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
  public userCollection = () => {
    this.dbConnect();
    const userSchema = new Schema<IUser>({
      name: { type: String, required: true },
      phone: { type: String, required: true },
      password: { type: String, required: true },
      created: { type: Date, default: Date.now },
      verified: { type: String, enum: ["verified", "unverified"], default: "unverified" },
      photo: { type: String, default: null }
    });
    const User = models.User || model<IUser>('User', userSchema);
    return User;
  }
}

export default db;
