
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: { unique: true }
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
   },
   isVarified: {
      type: Boolean,
      default: false,
   },
   role:{
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
   },
   forgotPasswordToken: {
      type: String,
   },
   forgotPasswordTokenExpiry: {
      type: Date,
   },
   verifyToken: {
      type: String,
   },
   verifyTokenExpiry: {
      type: Date,
   },
})

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;