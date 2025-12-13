import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
connectDB();

// Configure CORS
const allowedOrigins = ['http://localhost:5175'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get('/', (req, res) => res.json('API is working'));
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Start the server
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
