const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://shreeja:shreeja@cluster0.igvey.mongodb.net//bank')
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Schema & Model
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  amount: Number
});
const Data = mongoose.model("accounts", dataSchema);

// API to Fetch Data
app.get("/data", async (req, res) => {
  try {
    const users = await Data.find();
    console.log("Fetched Data:", users); // Debugging log
    res.json(users);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});
