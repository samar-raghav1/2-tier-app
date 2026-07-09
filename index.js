// index.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import connectDB from "./lib/db.js";
import dotenv from "dotenv";
dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Define Schema & Model
const DataSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const DataModel = mongoose.model("Data", DataSchema);

// Serve HTML form + data list
app.get("/", async (req, res) => {
  const allData = await DataModel.find();
  res.send(`
    <h2>Enter Data</h2>
    <form method="POST" action="/add">
      <input type="text" name="name" placeholder="Name" required />
      <input type="number" name="age" placeholder="Age" required />
      <button type="submit">Save</button>
    </form>
    <h2>Stored Data</h2>
    <ul>
      ${allData.map(item => `<li>${item.name} - ${item.age}</li>`).join("")}
    </ul>
  `);
});

// Handle form submission
app.post("/add", async (req, res) => {
  const { name, age } = req.body;
  const newData = new DataModel({ name, age });
  await newData.save();
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
