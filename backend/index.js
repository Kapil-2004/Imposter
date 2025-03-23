import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import commentRoute from "./routes/comment.js";
import userRoute from "./routes/user.js";
import feedbackRoute from "./routes/feedback.js";

const app = express();

const allowedOrigins = [ 
  "http://localhost:5173","https://imposter-frontend.vercel.app" 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);
app.use("/api/feedback", feedbackRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
