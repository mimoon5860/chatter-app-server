import { connect, model, Schema, models } from 'mongoose';
import { IUser } from '../utils/types/types';
import { config } from './config';

class db {

  //database connection
  private dbConnect = async () => {
    connect(`mongodb+srv://ued_db:${config.DB_PASS}@cluster0.avbdrcj.mongodb.net/?retryWrites=true&w=majority`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Database Connected")
      }
    });
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
      photo: String
    });
    const User = models.User || model<IUser>('User', userSchema);
    return User;
  }




}

export default db;
