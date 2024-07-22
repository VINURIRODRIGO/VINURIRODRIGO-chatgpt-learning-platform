const axios = require("axios");
const asyncHandler = require("express-async-handler");

const chatWithGPT = asyncHandler(async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: message,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error("ChatGPT error", error);
    res.status(500).send("Error communicating with ChatGPT");
  }
});

module.exports = {
  chatWithGPT,
};
