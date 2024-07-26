const { OpenAI } = require("openai");
const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");
const dotenv = require("dotenv");
const Course = require("../models/courseModel");
// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendMessage = catchAsyncError(async (req, res, next) => {
  const { message } = req.body;

  try {
    // Query the database for relevant courses
    const courses = await Course.find();
    // Generate a summary of courses
    const courseList = courses
      .map((course) => `${course.title}: ${course.description}`)
      .join("\n");

    // Include the course information in the ChatGPT prompt
    const prompt = `
      The user asked: "${message}"
      Here are some available courses:
      ${courseList}
      Based on the user's query, suggest relevant courses.
    `;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
    });
    const reply = response.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = { sendMessage };
