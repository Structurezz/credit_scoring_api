import express from 'express';
import connectDB from '../lib/config/db.js'; // Adjust the path as necessary
import cors from 'cors';
import morgan from'morgan';
import {logger} from '../app/middleware/loggingMiddleware.js';
import {limiter} from '../app/middleware/rateLimiting.js';
import {errorHandler} from '../app/middleware/errorHandler.js';
import dotenv from 'dotenv';
import scoringRoutes from '../routes/scoringRoutes.js';


dotenv.config();

// Middleware Setup

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(logger); // Log requests
app.use(limiter); // Apply rate limiting
// Middleware Setup
app.use(cors());           
app.use(morgan('dev'));  
  
// Connect to MongoDB
connectDB();


// Authentication Middleware
// Apply authentication for protected routes
app.use('/api/score',  scoringRoutes);
// Error handling middleware
app.use(errorHandler); 

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export server and app
export { server, app };
