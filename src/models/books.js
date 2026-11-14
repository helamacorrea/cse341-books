import { getDb } from "../db/connect.js";

const getAllbooks = async () => {
    const books = await getDb().collection('books').find({}).toArray();
    return books;
};

const getBookById = async (bookId) => {
    const book = await getDb().collection('books').findOne({ id: bookId });
    return book;
};

const createBook = async (book) => {
  const db = getDb();
  const collection = db.collection('books');
  await collection.insertOne(book);

  return book;
};

const updateBook = async (id, book) => {
  const db = getDb();
  const collection = db.collection('books');
  await collection.updateOne({ id }, { $set: book });

  return { id, ...book };
};

const deleteBook = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const result = await collection.deleteOne({ id });

  return result;
};


export { getAllbooks, getBookById, createBook, updateBook, deleteBook }