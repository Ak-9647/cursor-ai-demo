import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';

const router = Router();

// Book type definition
interface Book {
  id: string;
  title: string;
  author: string;
}

// Error response interface for consistency
interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// In-memory array for book data with sample books
let books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee'
  }
];

// Helper functions
const findBookById = (id: string): Book | undefined => {
  return books.find(b => b.id === id);
};

const findBookIndexById = (id: string): number => {
  return books.findIndex(b => b.id === id);
};

const validateBookData = (title: any, author: any): { isValid: boolean; error?: string } => {
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { isValid: false, error: 'Title is required and must be a non-empty string' };
  }
  
  if (!author || typeof author !== 'string' || author.trim().length === 0) {
    return { isValid: false, error: 'Author is required and must be a non-empty string' };
  }
  
  if (title.trim().length > 255) {
    return { isValid: false, error: 'Title must be 255 characters or less' };
  }
  
  if (author.trim().length > 255) {
    return { isValid: false, error: 'Author must be 255 characters or less' };
  }
  
  return { isValid: true };
};

const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  const errorResponse: ErrorResponse = {
    error: 'Request failed',
    message,
    statusCode
  };
  res.status(statusCode).json(errorResponse);
};

// GET /books - Get all books
router.get('/', (req: Request, res: Response) => {
  console.log('GET /books - Retrieved all books');
  res.json(books);
});

// GET /books/:id - Get a specific book
router.get('/:id', (req: Request, res: Response) => {
  const bookId = req.params.id;
  const book = findBookById(bookId);
  
  if (!book) {
    console.log(`GET /books/${bookId} - Book not found`);
    return sendErrorResponse(res, 404, 'Book not found');
  }
  
  console.log(`GET /books/${bookId} - Retrieved book: ${book.title}`);
  res.json(book);
});

// POST /books - Create a new book
router.post('/', (req: Request, res: Response) => {
  if (!req.body) {
    console.log('POST /books - No request body provided');
    return sendErrorResponse(res, 400, 'Request body is required');
  }
  
  const { title, author } = req.body;
  const validation = validateBookData(title, author);
  
  if (!validation.isValid) {
    console.log(`POST /books - Validation failed: ${validation.error}`);
    return sendErrorResponse(res, 400, validation.error!);
  }
  
  const newBook: Book = {
    id: randomUUID(),
    title: title.trim(),
    author: author.trim()
  };
  
  books.push(newBook);
  console.log(`POST /books - Created new book: ${newBook.title} by ${newBook.author}`);
  
  res.status(201)
    .set('Location', `/books/${newBook.id}`)
    .json(newBook);
});

// PUT /books/:id - Update a book
router.put('/:id', (req: Request, res: Response) => {
  if (!req.body) {
    console.log('PUT /books/:id - No request body provided');
    return sendErrorResponse(res, 400, 'Request body is required');
  }
  
  const bookId = req.params.id;
  const { title, author } = req.body;
  
  const bookIndex = findBookIndexById(bookId);
  
  if (bookIndex === -1) {
    console.log(`PUT /books/${bookId} - Book not found`);
    return sendErrorResponse(res, 404, 'Book not found');
  }
  
  const validation = validateBookData(title, author);
  
  if (!validation.isValid) {
    console.log(`PUT /books/${bookId} - Validation failed: ${validation.error}`);
    return sendErrorResponse(res, 400, validation.error!);
  }
  
  const updatedBook: Book = {
    ...books[bookIndex],
    title: title.trim(),
    author: author.trim()
  };
  
  books[bookIndex] = updatedBook;
  console.log(`PUT /books/${bookId} - Updated book: ${updatedBook.title}`);
  
  res.json(updatedBook);
});

// DELETE /books/:id - Delete a book
router.delete('/:id', (req: Request, res: Response) => {
  const bookId = req.params.id;
  const bookIndex = findBookIndexById(bookId);
  
  if (bookIndex === -1) {
    console.log(`DELETE /books/${bookId} - Book not found`);
    return sendErrorResponse(res, 404, 'Book not found');
  }
  
  const deletedBook = books[bookIndex];
  books.splice(bookIndex, 1);
  console.log(`DELETE /books/${bookId} - Deleted book: ${deletedBook.title}`);
  
  res.status(204).send();
});

export default router; 