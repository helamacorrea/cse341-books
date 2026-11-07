import { getDb } from "../db/connect.js";

const getAllbooks = async () => {
    const books = await getDb().collection('books').find({}).toArray();
    return books;
};

const getBookById = async (bookId) => {
    const book = await getDb().collection('books').findOne({ id: bookId });
    return book;
};

export { getAllbooks, getBookById }