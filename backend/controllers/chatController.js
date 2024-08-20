const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const Course = require("../models/courseModel");
const CustomErrorHandler = require("../utils/customErrorHandler");
const CatchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");

// Load environment variables
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let apiRequestCount = 0;

const sendMessage = CatchAsyncError(async (req, res, next) => {
  const { message } = req.body;
  if (apiRequestCount >= 250) {
    return next(new CustomErrorHandler("API request limit reached", 429));
  }
  try {
    // Query the database for relevant courses
    const courses = await Course.find();
    // Generate a summary of courses with IDs
    const courseList = courses
      .map(
        (course) =>
          `ID: ${course._id}, Title: ${course.title}, Description: ${course.description}`
      )
      .join("\n");

    // Include the course information in the ChatGPT prompt
    const prompt = `
      The user asked: "${message}"
      Here are some available courses:
      ${courseList}
       Based on the user's query, suggest only the relevant courses including  course._id, course.title, course.description as a Json format. If no relevant records found provide an empty array.
    `;
    try {
      response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
        max_tokens: 250,
      });
      apiRequestCount += 1;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        return next(
          new CustomErrorHandler(
            `OpenAI API returned an API Error: ${error.message}`,
            error.status
          )
        );
      } else if (error instanceof OpenAI.APIConnectionError) {
        return next(
          new CustomErrorHandler(
            `Failed to connect to OpenAI API: ${error.message}`,
            error.status
          )
        );
      } else if (error instanceof OpenAI.RateLimitError) {
        return next(
          new CustomErrorHandler(
            `OpenAI API request exceeded rate limit: ${error.message}`,
            error.status
          )
        );
      } else {
        return next(error);
      }
    }

    // Check for specific GPT errors
    const finishReason = response.choices[0].message.finish_reason;
    // Check if the conversation was too long for the context window
    if (finishReason === "length") {
      return next(
        new CustomErrorHandler(
          "The conversation was too long for the context window.",
          400
        )
      );
    }
    // Check if the model's output included copyright material (or similar)
    if (finishReason === "content_filter") {
      return next(
        new CustomErrorHandler(
          "The content was filtered due to policy violations.",
          400
        )
      );
    }
    // Check if the model has made a tool_call. This is the case either if the "finish_reason" is "tool_calls" or if the "finish_reason" is "stop" and our API request had forced a function call
    if (
      finishReason === "tool_calls" ||
      (response.ourApiRequestForcedAToolCall && finishReason === "stop")
    ) {
      return next(new CustomErrorHandler("Model made a tool call.", 400));
    }
    // Else finish_reason is "stop", in which case the model was just responding directly to the user
    else if (finishReason == "stop") {
      return next(
        new CustomErrorHandler(`"Model responded directly to the user."`, 500)
      );
    }

    // Clean the response
    const reply = response.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    // Logging the token usage
    console.log(
      `completion tokens: ${response.usage.completion_tokens},  prompt tokens: ${response.usage.prompt_tokens}, total tokens: ${response.usage.total_tokens}`
    );

    // Send the reply directly without additional JSON wrapping
    res.status(200).send(reply);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = { sendMessage };
