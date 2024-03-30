const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  prioritizeTodo,
} = require("../controllers/todo.controller");

const todoRouter = express.Router();

todoRouter.get("/todos", authenticate, getTodos);

todoRouter.post("/create", authenticate, createTodo);

todoRouter.patch("/update/:id", authenticate, updateTodo);

todoRouter.patch("/update/prioritize/:id", authenticate, prioritizeTodo);

todoRouter.delete("/delete/:id", authenticate, deleteTodo);

module.exports = { todoRouter };
