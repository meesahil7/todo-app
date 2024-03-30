const { TodoModel } = require("../models/todo.model");

const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ userId: req.body.userId });
    res.send({ todos });
  } catch (err) {
    console.log(err);
    res.send({ message: "cannot-find-todo", error: err });
  }
};

const createTodo = async (req, res) => {
  const payload = req.body;
  try {
    const todo = new TodoModel({ ...payload, userId: req.body.userId });
    await todo.save();
    res.send({ message: "todo-created-successfully", todo });
  } catch (err) {
    console.log(err);
    res.send({ message: "cannot-create-todo", error: err });
  }
};

const updateTodo = async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const todo = await TodoModel.findOne({ _id: id });
  const userId_in_todo = todo.userId;
  const userId_making_req = req.body.userId;
  try {
    if (userId_in_todo !== userId_making_req) {
      res.send({ message: "you are not allowed to update this todo" });
    } else {
      await TodoModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ message: "updated-the-todo" });
    }
  } catch (err) {
    res.send({ message: "cannot-update-the-todo", error: err });
  }
};

const prioritizeTodo = async (req, res) => {
  const { priority } = req.body;
  const id = req.params.id;
  const todo = await TodoModel.findOne({ _id: id });
  const userId_in_todo = todo.userId;
  const userId_making_req = req.body.userId;
  try {
    if (userId_in_todo !== userId_making_req) {
      res.send({ message: "you are not allowed to make changes" });
    } else {
      // await TodoModel.findByIdAndUpdate({ _id: id }, { ...todo, priority });
      todo.priority = priority;
      await todo.save();
      res.send({ message: "updated-the-todo" });
    }
  } catch (err) {
    res.send({ message: "cannot-update-the-todo", error: err });
  }
};

const deleteTodo = async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const todo = await TodoModel.findOne({ _id: id });
  const userId_in_todo = todo.userId;
  const userId_making_req = req.body.userId;
  try {
    if (userId_in_todo !== userId_making_req) {
      res.send({ message: "you are not allowed to delete this todo" });
    } else {
      await TodoModel.findByIdAndDelete({ _id: id });
      res.send({ message: "deleted-the-todo" });
    }
  } catch (err) {
    res.send({ message: "cannot-delete-the-todo", error: err });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  prioritizeTodo,
  deleteTodo,
};
