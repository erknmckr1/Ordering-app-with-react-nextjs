import mongoose from "mongoose";
const Schema = mongoose.Schema;

// User sayfası için şema tanımı 
const UserSchema = new Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    job: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: String,
      default: null,
    },
  },
  { timestamps: true })

  // user sayfası ıcın model oluşturma 
  export default mongoose.models.User || mongoose.model("User", UserSchema);