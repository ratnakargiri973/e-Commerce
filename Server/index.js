import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectToDB } from './db/connection.js';
import userRouter from './Routes/userRoutes.js';
import authRouter from './Routes/authRoute.js';
import cookieParser from 'cookie-parser';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartRoute.js';

const PORT = process.env.PORT;

const app = express();
const corsOption = {
    origin:
    process.env.NODE_ENV === "production"
      ? "https://your-frontend-domain.com"
      : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOption));
app.use(cookieParser());


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRouter);

await connectToDB();
app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`);
})
