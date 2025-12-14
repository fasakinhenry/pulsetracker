import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import healthRouter from './routes/health.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Database
connectDB();

// CORS CONFIG
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, curl, uptime monitors
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`❌ CORS blocked: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.json('API is working');
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

// Health endpoint (NO CORS issues)
app.use('/health', healthRouter);

// Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
