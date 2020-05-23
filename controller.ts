import db from "./db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

interface IProduct {
  name: string;
  desc?: string;
  price: number;
  calories: number;
  imageUrl: string;
}

const database = db.getDatabase;
const products = database.collection("products");

export const getProducts = async ({ response }: { response: any }) => {
  const res = await products.find({});
  response.status = 200;
  response.body = res;
};

export const getProduct = async (
  { response, params: { id } }: { response: any; params: { id: string } },
) => {
  const res = await products.findOne(
    { _id: ObjectId(id) },
  );
  response.status = 200;
  response.body = res;
};

export const createProduct = async (
  { response, request }: { response: any; request: any },
) => {
  const body = await request.body();
  const product: any = body.value;
  if (product.hasOwnProperty("name") && product.hasOwnProperty("price")) {
    const res = await products.insertOne(product);
    response.status = 200;
    response.body = res;
  } else {
    response.status = 400;
    response.body = { message: "Name and Price are required" };
  }
};

export const updateProduct = async (
  { response, request, params: { id } }: {
    response: any;
    request: any;
    params: { id: string };
  },
) => {
  const { value } = await request.body();
  const res = await products.updateOne({ _id: ObjectId(id) }, {
    $set: value,
  });
  if (res.matchedCount) {
    response.status = 200;
    response.body = res;
  } else {
    response.status = 404;
    response.body = { message: "Product not found" };
  }
};

export const deleteProduct = async (
  { response, params: { id } }: { response: any; params: { id: string } },
) => {
  const res = await products.deleteOne({ _id: ObjectId(id) });
  if (res) {
    response.status = 200;
    response.body = { message: "OK" };
  } else {
    response.status = 404;
    response.body = { message: "Product not found" };
  }
};
