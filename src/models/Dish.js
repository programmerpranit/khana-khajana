import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

mongoose.models = {};

export default mongoose.model("Dish", DishSchema);
