import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import serviceRouter from "./routes/service.route.js";
import reviewRouter from "./routes/review.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.get('/', (req,res)=>{
  res.send('Api is working');
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/service", serviceRouter);
app.use("/api/reviews", reviewRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


