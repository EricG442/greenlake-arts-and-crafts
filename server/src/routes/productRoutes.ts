import { Router } from "express";
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductByID);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;