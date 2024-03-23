// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  dob: Date;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
