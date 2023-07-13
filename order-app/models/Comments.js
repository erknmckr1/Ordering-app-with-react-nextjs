import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comments ||
  mongoose.model("Comments", CommentsSchema);
