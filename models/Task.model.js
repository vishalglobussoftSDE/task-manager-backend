import mongoose from "mongoose";

// Sub-schema for todo checklist items
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// Main task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  dueDate: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  attachments: [{
    type: String
  }],
  todoCheckList: [todoSchema],
  progress: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // ✅ Proper placement
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
