// index.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { DataTypes } from "sequelize";
import { sequelize } from "./lib/db.js"; // Sequelize connection
import connectDB from "./lib/db.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define Sequelize model
const DataModel = sequelize.define("Data", {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: false
});

// Ensure table exists
await sequelize.sync();

// Serve HTML form + data list with Bootstrap styling
app.get("/", async (req, res) => {
  const allData = await DataModel.findAll();

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Data Entry App</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { background: #f8f9fa; }
        .container { margin-top: 50px; }
        h2 { color: #343a40; }
        .card { margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 class="text-center">Enter Data</h2>
        <div class="card p-4 shadow-sm">
          <form method="POST" action="/add">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" name="name" class="form-control" placeholder="Enter name" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Age</label>
              <input type="number" name="age" class="form-control" placeholder="Enter age" required />
            </div>
            <button type="submit" class="btn btn-primary w-100">Save</button>
          </form>
        </div>

        <h2 class="text-center mt-5">Stored Data</h2>
        <ul class="list-group">
          ${allData.map(item => `<li class="list-group-item">${item.name} - ${item.age}</li>`).join("")}
        </ul>
      </div>
    </body>
    </html>
  `);
});

// Handle form submission
app.post("/add", async (req, res) => {
  const { name, age } = req.body;
  await DataModel.create({ name, age });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
