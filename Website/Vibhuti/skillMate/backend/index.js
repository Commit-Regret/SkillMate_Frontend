// index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // allow frontend to send requests
app.use(express.json()); // to parse JSON in request body

// Simple POST endpoint
app.post("/api/profile", (req, res) => {
  console.log("Received data:", req.body);
  res.status(200).json({ message: "Profile saved successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
