import db from "./db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

interface IBook {
  isbn: string;
  author: string;
  title: string;
}

const database = db.getDatabase;
const products = database.collection("products");

export const getProducts = async ({ response }: { response: any }) => {
  const res = await products.find({});
  console.log("res:", res);
  response.status = 200;
  response.body = res;
};

export const getProduct = async (
  { response, params: { id } }: { response: any; params: { id: string } },
) => {
  const res = await products.findOne(
    { _id: ObjectId(id) },
  );
  console.log("res:", res);
  response.status = 200;
  response.body = res;
};

let books: Array<IBook> = [{
  isbn: "1",
  author: "Robin Wieruch",
  title: "The Road to React",
}, {
  isbn: "2",
  author: "Kyle Simpson",
  title: "You Don't Know JS: Scope & Closures",
}, {
  isbn: "3",
  author: "Andreas A. Antonopoulos",
  title: "Mastering Bitcoin",
}];

const getBooks = ({ response }: { response: any }) => {
  response.body = books;
};

const getBook = (
  { params, response }: { params: { isbn: string }; response: any },
) => {
  const book: IBook | undefined = searchBookByIsbn(params.isbn);
  if (book) {
    response.status = 200;
    response.body = books[0];
  } else {
    response.status = 404;
    response.body = { message: `Book not found.` };
  }
};

const addBook = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const book: IBook = body.value;
  books.push(book);
  response.body = { message: "OK" };
  response.status = 200;
};

const updateBook = async (
  { params, request, response }: {
    params: { isbn: string };
    request: any;
    response: any;
  },
) => {
  let book: IBook | undefined = searchBookByIsbn(params.isbn);
  if (book) {
    const body = await request.body();
    const updateInfos: { author?: string; title?: string } = body.value;
    book = { ...book, ...updateInfos };
    books = [...books.filter((book) => book.isbn !== params.isbn), book];
    response.status = 200;
    response.body = { message: "OK" };
  } else {
    response.status = 404;
    response.body = { message: `Book not found` };
  }
};

const deleteBook = (
  { params, response }: { params: { isbn: string }; response: any },
) => {
  books = books.filter((book) => book.isbn !== params.isbn);
  response.body = { message: "OK" };
  response.status = 200;
};

/* return the book if found and undefined if not */
const searchBookByIsbn = (isbn: string): (IBook | undefined) =>
  books.filter((book) => book.isbn === isbn)[0];

export { getBooks, getBook, addBook, updateBook, deleteBook };
