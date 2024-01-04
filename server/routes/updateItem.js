import express from "express";
import Product from '../database/productSchema.js';
import cloudinary from "../claudinary.js";
import multer from 'multer';
const updateProductRouter = express.Router();
const upload = multer({ dest: "uploads/" }).single("image");
updateProductRouter.put("/:id", async (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (err) {
                console.error("Error uploading file:", err);
                return res.status(500).json({ message: "File upload failed" });
            }

            const title = req.body.title;
            const description = req.body.description;
            const price = req.body.price;
            const category = req.body.category;
            const url = req.body.url;
            const image = req.file;
            const id = req.body.id;
            const link=req.body.link;
           // console.log(req.body);
            // Check if the product already exists
            const existingProduct = await Product.findById(id);
            if(!existingProduct){
                return res.status(404).json({ message: "Product not found" });
            }
            let result = url;
            if (image) {
                // Handle case where no file is uploaded
                result = await cloudinary.uploader.upload(image.path, {
                    folder: "products",
                });
                result = result.secure_url;
            }
            else if (url != null && url != "" && url != undefined && url.length != 0) {
                result = url;
            }
            else return res.status(400).json({ message: "Missing required parameter - file" });

            // If it exists, update the description and price
            existingProduct.title = title;
            existingProduct.description = description;
            existingProduct.price = price;
            existingProduct.image = result;
            existingProduct.category = category;
            existingProduct.link = link;
            console.log(existingProduct);
            await existingProduct.save();
            return res.status(200).json({ message: "Product updated successfully" });
        } catch (error) {
            console.error("Error adding product:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
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