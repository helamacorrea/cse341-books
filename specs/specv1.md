# Feature Description
The Books API should provide endpoints to retrieve all books and retrieve one book by id. These endpoints allow a client application to display a full book list and detailed information for a single selected book.

# Key Requirementes
- Database Mongo DB normalized
- Route and parameter to retrieve one book or all books by id
- /books/

# Books API Spec

## Purpose
Create a basic web service that returns book data.

## Data Model
Book fields:
- id: string
- author: string
- title: string
- publicationDate: string

## Endpoints
1. GET /books
- Returns all books.
- Response status: 200 on success.

2. GET /books/:id
- Returns one book with matching id.
- Response status: 200 on success.
- If no match: 404.

## Initial assumptions
- Data is stored in MongoDB collection named books.
- API returns JSON.


## Questions to ask
Ask yourself following questions. Then, copy your spec into AI and ask it these questions as well.

Are there any bugs or short-sighted decisions in this specification?
Are there any security concerns that are missing?
Are there any parts of the current route design that might be slow?
Are any response examples or error behaviors unclear?
Here are some answers you might decide:

Publication date format should be explicitly defined in responses.
The API should not expose internal MongoDB error details to clients.
List responses should return only required fields and use predictable ordering when needed.
The spec should include concrete JSON examples for success and not-found responses.