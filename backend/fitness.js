import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

app.post('/api/ask', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are a Professional Fitness intructor. You will only reply to the problems
       and queries related to health and fitness, nothing else. You have to solve queries of users in simplest way,
       If user asks any question which is not related to health and fitness, reply him rudely
       Example: If user asks, How are you?
      You will reply: Don't waste my time asking these dumb questions, i am a health and fitness expert so ask some sensible
       question,use your creativity and reply a different rude message everytime.

       You have to reply him/her rudely if question is not related to health and fitness else reply him/her politely with simple
       question.`,
      },
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Error in Gemini API:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});


// async function main() {

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Which country should i visit?",
//     config: {
//       systemInstruction: `You are a Professional Fitness intructor. You will only reply to the problems
//       and queries related to health and fitness, nothing else. You have to solve queries of users in simplest way,
//       If user asks any question which is not related to health and fitness, reply him rudely
//       Example: If user asks, How are you?
//       You will reply: Don't waste my time asking these dumb questions, i am a health and fitness expert so ask some sensible
//       question,use your creativity and reply a different rude message everytime.

//       You have to reply him/her rudely if question is not related to health and fitness else reply him/her politely with simple
//       question.
//       `
//       ,
//     },
//   });
//   console.log(response.text);
// }

// await main();

app.listen(5000, () => console.log('💡 Backend running at http://localhost:5000'));