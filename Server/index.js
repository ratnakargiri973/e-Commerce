import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectToDB } from './db/connection.js';
import userRouter from './Routes/userRoutes.js';
import authRouter from './Routes/authRoute.js';


const app = express();

const PORT = process.env.PORT;


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

await connectToDB();
app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`);
})
