import express from "express";
import Product from '../database/productSchema.js';

const updateProductRouter = express.Router();

updateProductRouter.put("/:id", async (req, res) => {
    try {
        console.log(req);
        const { title, description, price, id } = req.body;
        // Check if the product with the given ID exists
        const existingProduct = await Product.findById(id);
        console.log(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the product details
        existingProduct.title = title;
        existingProduct.description = description;
        existingProduct.price = price;

        // Save the updated product
        const updatedProduct = await existingProduct.save();

        // Return the updated product as JSON
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

updateProductRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the product with the given ID exists
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the product
        await existingProduct.deleteOne(); // or use existingProduct.deleteMany() if needed

        // Return a success message
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


export default updateProductRouter;