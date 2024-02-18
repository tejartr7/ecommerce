import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link:{
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now()+1000*60*60*24*3,
  },
});
const Product = mongoose.model('product', product);

export default Product;