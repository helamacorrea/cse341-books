import { getDb } from "../db/connect.js";

const getAllbooks = async () => {
    const books = await getDb().collection('books').find({}).toArray();
    return books;
};

export { getAllbooks }