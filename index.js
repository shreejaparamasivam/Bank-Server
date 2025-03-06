var express = require('express');
var mongoose = require('mongoose');

var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => res.send("Welcome"));

// Open the port
app.listen(8080, () => {
  console.log("Server Connected");
});

// Connect MongoDB
mongoose.connect('mongodb+srv://shreeja:shree12@cluster0.vpxyc.mongodb.net/bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("DB Connected"))
.catch((err) => console.error("DB Connection Error:", err));

// Create schema
let dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  amount: Number
});

// Define model
let Data = mongoose.model("accounts", dataSchema);

// API to fetch data
app.get('/data', async (req, res) => {
  try {
    const items = await Data.find();
    res.send(items);
  } catch (error) {
    res.status(500).send({ message: "Error fetching data", error });
  }
});

// API to create data
app.post('/create', async (req, res) => {
  try {
    const newItem = await Data.create(req.body);
    res.send(newItem);
  } catch (error) {
    res.status(500).send({ message: "Error creating data", error });
  }
});

// API to delete data
app.delete('/delete/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.send({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting data", error });
  }
});

// API to update data
app.put('/update/:id', async (req, res) => {
  try {
    const updatedItem = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedItem);
  } catch (error) {
    res.status(500).send({ message: "Error updating data", error });
  }
});
