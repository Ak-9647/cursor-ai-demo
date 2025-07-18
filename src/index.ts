import express, { Request, Response, NextFunction } from 'express';
import booksRouter from './routes/books';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!', timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// API Routes
app.use('/books', booksRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});

export default app; 