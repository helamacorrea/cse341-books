# Update Book Collection to reference authors and finish Book API

## Description
- Update the existing Week 01 book API so book documents include a reference to an author.
- Add the remaining CRUD operations for books.
- Validate book request bodies before writing to MongoDB.
- Validate that each submitted `authorId` matches an existing author document.
- Add Swagger documentation for all book routes.
- Test the book routes locally and in the deployed Render application.

## Spec
### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Test Plan
- Existing `GET /books` responses include `authorId`.
- Existing `GET /books/:id` responses include `authorId`.
- `POST /books` creates a book and returns status 201.
- `POST /books` returns 400 when required fields are missing.
- `POST /books` returns 400 when `authorId` does not match an existing author.
- `PUT /books/:id` updates an existing book.
- `PUT /books/:id` returns 400 when `authorId` does not match an existing author.
- `PUT /books/:id` returns 404 when the book does not exist.
- `DELETE /books/:id` deletes an existing book.
- `DELETE /books/:id` returns 404 when the book does not exist.
- All book routes are documented in Swagger.
- All book routes can be tested locally from `/api-docs`.
- All book routes can be tested from the deployed Render `/api-docs` page.


# Implement Author Collection and CRUD API

## Description
Create a separate collection for authors, implement CRUD operations, validate inputs, and prevent deleting authors who still have books associated with them.

## Spec
### Feature 2: Author CRUD Operations

### Goal
Add an author collection that stores author ids, names, and birth years. Provide all CRUD operations for this collection. 

### Data Model
Author documents will be stored in the `authors` collection. We are going to use custom ids like `a1` rather than MongoDB's `_id`. 

Required author fields:
- `id`: string, required ex: `a1`
- `name`: string, required
- `birthYear`: integer, required


### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by its custom id.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Arthur Conan Doyle",
      "birthYear": 1859
    }

Success:
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing
- `400` if a field is invalid
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author.

Request body example:

    {
      "name": "Updated name",
      "birthYear": 1859
    }

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing 
- `400` if a field is invalid
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no author exists with that id
- `409` if books still reference this author
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every author route.

### Deployment Expectations
After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

## Test Plan
- `GET /authors` returns a list of authors.
- `GET /authors/:id` returns the requested author.
- `GET /authors/:id` returns 404 when the author does not exist.
- `POST /authors` creates an author and returns 201.
- `POST /authors` returns 400 for missing or invalid fields or duplicate IDs.
- `PUT /authors/:id` updates an existing author.
- `PUT /authors/:id` returns 404 when the author does not exist.
- `DELETE /authors/:id` deletes an existing author.
- `DELETE /authors/:id` returns 404 when the author does not exist.
- `DELETE /authors/:id` returns 409 when books reference the author.
- All author routes are documented in Swagger.
- All author routes can be tested locally from `/api-docs`.
- All author routes can be tested from the deployed Render `/api-docs` page.

