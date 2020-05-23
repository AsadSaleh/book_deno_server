import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  getProducts,
} from "./controller.ts";

const router = new Router();
router.get("/books", getBooks)
  .get("/books/:isbn", getBook)
  .post("/books", addBook)
  .put("/books/:isbn", updateBook)
  .delete("/books/:isbn", deleteBook)
  // products
  .get("/products", getProducts)
  .get("/products/:id", () => {})
  .post("/products", () => {})
  .put("/products/:id", () => {})
  .delete("/products/:id", () => {});

export default router;
