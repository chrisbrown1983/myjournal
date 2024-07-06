const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");

exports.chatGPT = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const {message} = req.body;

  try {
    const response = await axios.post("https://api.openai.com/v1/engines/davinci-codex/completions", {
      prompt: message,
      max_tokens: 150,
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    logger.error("Error communicating with OpenAI API", error);
    res.status(500).send("Error communicating with OpenAI API");
  }
});
