// netlify/functions/ai-chat.js
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const FAQ = require("./faq.json");

// --- Moderation helper ---
async function moderate(text) {
  try {
    const resp = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "omni-moderation-latest",
        input: text,
      }),
    });
    const data = await resp.json();
    return { allowed: !data?.results?.[0]?.flagged };
  } catch (err) {
    console.error("Moderation error:", err);
    return { allowed: true }; // fail-open so UX isn’t broken
  }
}

// --- Topic allowlist ---
const ALLOWED_TOPICS = [
  "services",
  "pricing",
  "consult",
  "contact",
  "company",
  "support",
  "chatbot",
  "automation",
  "marketing",
  "analytics",
  "training",
  "privacy",
  "terms",
];
function isOnTopic(msg) {
  const t = msg.toLowerCase();
  return ALLOWED_TOPICS.some((k) => t.includes(k));
}

// --- Rate limiting + length check (naive in-memory) ---
const MAX_CHARS = 800;
const hits = {};
function tooLong(s) {
  return (s || "").length > MAX_CHARS;
}
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 30 * 1000; // 30s
  const limit = 8; // 8 messages per 30s
  const arr = (hits[ip] = (hits[ip] || []).filter((t) => now - t < windowMs));
  if (arr.length >= limit) return true;
  arr.push(now);
  return false;
}

// --- FAQ helpers ---
function pickRelevantFaq(userMsg, k = 6) {
  const msg = (userMsg || "").toLowerCase();
  const terms = new Set(msg.split(/[^a-z0-9]+/).filter(Boolean));
  const scored = FAQ.map((item) => {
    const text = (item.q + " " + item.a).toLowerCase();
    let score = 0;
    for (const t of terms) if (text.includes(t)) score++;
    return { item, score };
  }).sort((a, b) => b.score - a.score);
  const top =
    (scored[0]?.score || 0) > 0
      ? scored.slice(0, k)
      : FAQ.slice(0, k).map((i) => ({ item: i, score: 0 }));
  return top.map(({ item }) => item);
}
function buildContextBlock(faqItems) {
  const lines = faqItems.map(({ q, a }) => `Q: ${q}\nA: ${a}`);
  return `Business context:\n\n${lines.join("\n\n")}`;
}

// --- Handler ---
exports.handler = async function (event) {
  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No message provided" }),
      };
    }

    // Rate limit + length guard
    const ip =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["x-forwarded-for"] ||
      "unknown";
    if (rateLimited(ip)) {
      return {
        statusCode: 429,
        body: JSON.stringify({
          reply:
            "You’re sending messages quickly — please wait a moment before trying again.",
        }),
      };
    }
    if (tooLong(message)) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply:
            "That message is a bit long. Could you summarize your question?",
        }),
      };
    }

    // Moderation check
    const { allowed } = await moderate(message);
    if (!allowed) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply:
            "I can’t help with that. Please keep questions focused on our services and consults.",
        }),
      };
    }

    // On-topic check
    if (!isOnTopic(message)) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply:
            "I’m here to answer questions about our services, pricing, and consults. For other topics, please email hello@berengard.tech.",
        }),
      };
    }

    // FAQ context
    const contextFaq = pickRelevantFaq(message);
    const contextBlock = buildContextBlock(contextFaq);

    // System safety + business rules
    const SAFETY_RULES = `
You are Arwen, the Berengard Assistant. Be professional, friendly, and concise.
- Only answer using the provided business context when relevant.
- If info isn’t in the context, say you don’t know and suggest contacting hello@berengard.tech.
- Do NOT reveal implementation details (hosting, providers, server names, source code, API keys, environment variables).
- Politely refuse hateful, harassing, illegal, self-harm, or adult content.
- If asked about internal systems, reply: "I don’t have access to implementation details, but I can help with our services and booking a consult."
- Prefer bullet points and short paragraphs.
`;

    // Call OpenAI
    const resp = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `${SAFETY_RULES}\n---\n${contextBlock}` },
          { role: "user", content: message },
        ],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("OpenAI error:", resp.status, text);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Upstream AI error" }),
      };
    }

    const data = await resp.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a reply.";
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
};
