import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./controller.ts";

const router = new Router();
router
  // products
  .get("/products", getProducts)
  .get("/products/:id", getProduct)
  .post("/products", createProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);

export default router;
