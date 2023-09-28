import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
  {
    dishes: [
      {
        dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
        quantity: Number,
        dishName: String,
        price: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    table: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("Bill", BillSchema);
