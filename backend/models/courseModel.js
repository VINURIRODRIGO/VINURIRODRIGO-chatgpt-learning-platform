const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
