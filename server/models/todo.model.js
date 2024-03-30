const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "task must have a title"],
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  category: {
    type: String,
    enum: ["home", "work", "grocery"],
    required: [true, "user must add task category"],
  },
  priority: {
    type: String,
    enum: ["casual", "important", "urgent"],
    default: "casual",
  },
  userId: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = { TodoModel };
