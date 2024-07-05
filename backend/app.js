const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors({
  origin:"*",
})); 

connectDB();
app.use(express.json());
app.use("/api", transactionRoutes);

module.exports = app;
