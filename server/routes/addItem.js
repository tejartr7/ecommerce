import express from "express";
import Product from '../database/productSchema.js'

const addProductRouter = express.Router();

addProductRouter.post("/", async (req, res) => {
    try {
        const { title, description, price } = req.body;
        console.log(req.body);
        // Check if the product already exists
        const existingProduct = await Product.findOne({ title: title });

        if (existingProduct) {
            // If it exists, update the description and price
            existingProduct.description = description;
            existingProduct.price = price;
            await existingProduct.save();
            return res.status(200).json({ message: "Product updated successfully" });
        } else {
            // If it doesn't exist, create a new product and save it to the database
            const newProduct = new Product({
                title: title,
                description: description,
                price: price
            });

            await newProduct.save();
            return res.status(201).json({ message: "Product created successfully" });
        }
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


addProductRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
       // console.log(products); // Add this line to log the products
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
addProductRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error getting product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
export default addProductRouter;
