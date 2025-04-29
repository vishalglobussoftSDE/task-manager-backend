import express from "express";
import cors from "cors";
import configDotenv from "dotenv";
// import userRoute from './routes/user.route.js';
// import reportRoute from './routes/report.route.js';
// import taskRoute from './routes/task.route.js';
import authRoute from './routes/auth.route.js';

import connectDB from "./DB/config.db.js";

const app = express();
configDotenv.config();
connectDB();

const PORT = process.env.PORT || 3001;

// ✅ Use parentheses here, not curly braces
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running smoothly.");
});

// API Routes
// app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
// app.use('/api/tasks', taskRoute);
// app.use('/api/reports', reportRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});
