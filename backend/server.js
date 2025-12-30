const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ import

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // if using cookies
}));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // ✅ mount auth routes

app.get("/", (req, res) => {
  res.send("CodVeda API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
