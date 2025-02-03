const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    phone: { type: String, required: true },
    notes: { type: String, required: true, trim: true },
    agentId: { type: String, required: true },
    agentName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
const Task = mongoose.model("tasks", taskSchema);

module.exports = { User, Task };

//timestamps is used to get details when user is created
