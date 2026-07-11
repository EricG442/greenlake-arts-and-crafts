import { Request, Response } from "express";
import * as productService from "../services/productService.js";

export async function getProducts(req: Request, res: Response): Promise<void> {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
}

export async function getProductByID(req: Request, res: Response): Promise<void> {
    try {
        const idParam = req.params.id;
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        if (!id) {
            res.status(400).json({ message: "Product ID is required" });
            return;
        }
        const product = await productService.getProductByID(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch product" });
    }
}