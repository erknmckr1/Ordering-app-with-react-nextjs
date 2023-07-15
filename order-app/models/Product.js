import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extras: {
      type: [
        {
          item: { type: String },
          price: { type: Number },
        },
      ],
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountPrice:{
      type:Number,
      default:0,
    },
    discountAmount:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
