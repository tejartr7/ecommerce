
import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connect.js";
import addProductRouter from "./routes/addItem.js";
import updateProductRouter from "./routes/updateItem.js";
import deleteProductRouter from "./routes/deleteItem.js";
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
dotenv.config();
app.use("/addProduct", addProductRouter);
app.use("/updateProduct", updateProductRouter);

app.listen(8000, () => {
    connectDB(process.env.MONGODB_URL);
    console.log('Server is running on port 8000');
});