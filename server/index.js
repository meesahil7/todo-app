const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { todoRouter } = require("./routes/todo.route");

const app = express();

require("dotenv").config();

const cors = require("cors");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the todo backend...");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the database");
  } catch (err) {
    console.log("Cannot connect to the database");
    console.log(err);
  }
  console.log(`The server is listening 🚀 on port ${PORT}...`);
});
