// src/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Log requests (simple dev logging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// Routes
app.use("/api", routes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "DynamoDB CRUD API is running",
    docs: "/api/health",
    endpoints: {
      listItems: "GET /api/items",
      getItem: "GET /api/items/:id",
      createItem: "POST /api/items",
      updateItem: "PUT /api/items/:id",
      deleteItem: "DELETE /api/items/:id",
    },
  });
});

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DynamoDB CRUD API listening on http://localhost:${PORT}`);
});
