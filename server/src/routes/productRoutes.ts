import { Router } from "express";
import { getProducts, getProductByID } from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductByID);
export default router;