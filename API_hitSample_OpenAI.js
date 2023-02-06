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
      prompt: `can you tell me where is ${coor.lat},${coor.lon} and its current weather in json format only`,
      temperature: 0,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 2,
    });
    console.log(response.data, response.data.choices[0].text)
  } catch (err) {
    console.log(err);
  }
}

generateAnswer()
