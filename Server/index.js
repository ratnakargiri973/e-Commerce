import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectToDB } from './db/connection.js';
import userRouter from './Routes/userRoutes.js';
import authRouter from './Routes/authRoute.js';
import cookieParser from 'cookie-parser';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartRoute.js';
import couponRouter from './Routes/couponRoute.js';
import blogRouter from './Routes/blogRoute.js';
import brandRouter from './Routes/brandRoute.js';
import categoryRouter from './Routes/categoryRoute.js';


const PORT = process.env.PORT;

const app = express();
const corsOption = {
    origin:"https://e-commerce-1-34e1.onrender.com",
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
app.use('/api/v1/coupon', couponRouter);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/brand', brandRouter);
app.use("/api/v1/category", categoryRouter);

await connectToDB();
app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`);
})
