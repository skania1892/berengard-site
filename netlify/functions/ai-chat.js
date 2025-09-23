// netlify/functions/ai-chat.js
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
// Bundle-local JSON (esbuild will include it)
const FAQ = require("./faq.json");

// Very simple relevance: rank by overlapping keywords
function pickRelevantFaq(userMsg, k = 6) {
  const msg = (userMsg || "").toLowerCase();
  const terms = new Set(msg.split(/[^a-z0-9]+/).filter(Boolean));
  const scored = FAQ.map((item) => {
    const text = (item.q + " " + item.a).toLowerCase();
    let score = 0;
    for (const t of terms) if (text.includes(t)) score++;
    return { item, score };
  }).sort((a, b) => b.score - a.score);
  // If nothing scores, still return a few general items
  const top = (scored[0]?.score || 0) > 0 ? scored.slice(0, k) : FAQ.slice(0, k).map(i => ({ item: i, score: 0 }));
  return top.map(({ item }) => item);
}

function buildContextBlock(faqItems) {
  const lines = faqItems.map(({ q, a }) => `Q: ${q}\nA: ${a}`);
  return `Use this business context to answer concisely. If a question is unrelated, say you don’t know and invite the user to contact us.\n\n${lines.join("\n\n")}`;
}

exports.handler = async function (event) {
  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) {
      return { statusCode: 400, body: JSON.stringify({ error: "No message provided" }) };
    }

    const contextFaq = pickRelevantFaq(message);
    const contextBlock = buildContextBlock(contextFaq);

    const resp = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
`You are Arwen, the Berengard Assistant. Be professional, friendly, and concise.
- Only answer using the provided business context when relevant.
- If you’re unsure or the info isn’t in context, say you don’t know and suggest contacting hello@berengard.tech.
- Prefer bullet points and short paragraphs.
\n---\n${contextBlock}`
          },
          { role: "user", content: message }
        ],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("OpenAI error:", resp.status, text);
      return { statusCode: 502, body: JSON.stringify({ error: "Upstream AI error" }) };
    }

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn’t generate a reply.";
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
