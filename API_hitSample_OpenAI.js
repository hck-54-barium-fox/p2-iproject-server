const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

let coor = {
  lat: -6.2088,
  lon: 106.8456
}

async function generateAnswer() {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `suggest one music search query for cloudy weather`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: 2,
    });
    console.log(response.data.choices[0].text)
  } catch (err) {
    console.log(err);
  }
}

generateAnswer()
