import { Router } from "express";
import multer from "multer";
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct, uploadProductImage } from "../controllers/productController.js";

const router = Router();
const upload = multer();

router.get("/", getProducts);
router.get("/:id", getProductByID);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/image", upload.single("image"), uploadProductImage);
export default router;