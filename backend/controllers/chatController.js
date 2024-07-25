const { Configuration, OpenAI } = require("openai");
const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI({
  organization: "org-3hbLi07WFd9CmUUiyxOd0eit",
  project: "proj_MIchTOa8IdAnBJ8fG91hXxm7",
});;

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

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = response.data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = { sendMessage };
