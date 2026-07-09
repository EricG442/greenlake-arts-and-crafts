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