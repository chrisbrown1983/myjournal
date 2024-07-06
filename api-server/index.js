require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/chatGPT', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with OpenAI API', error);
    res.status(500).send('Error communicating with OpenAI API');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
