// netlify/functions/ai-chat.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No message provided" }),
      };
    }

    // Call OpenAI API
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // cheap + fast model
      messages: [
        {
          role: "system",
          content: "You are Elan, the Berengard Assistant. Be professional, friendly, and concise.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
}
