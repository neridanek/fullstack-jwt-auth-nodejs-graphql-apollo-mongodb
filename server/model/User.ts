import mongoose from "mongoose";
export interface userDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 16,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 12,
    min: 6,
  },
});
const User = mongoose.model<userDocument>("User", userSchema);
export default User;
