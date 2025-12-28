// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const userRoutes = require("./routes/userRoutes"); // we will create this next

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("CodVeda Level 2 Backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
