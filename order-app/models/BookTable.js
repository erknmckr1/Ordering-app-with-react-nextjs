import mongoose, { mongo } from "mongoose";

const BookTableSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    persons:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});

export default mongoose.models.BookTable ||
  mongoose.model("BookTable", BookTableSchema);
