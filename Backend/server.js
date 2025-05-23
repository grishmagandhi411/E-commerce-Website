import express from "express";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { sendOtp, verifyOtp } from "./controllers/otpController.js";

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Api endpoint
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Routes
app.post('/send-otp', sendOtp);
app.post('/verify-otp', verifyOtp);

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
