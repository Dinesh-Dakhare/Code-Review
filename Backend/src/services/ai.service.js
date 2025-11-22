import { GoogleGenAI } from "@google/genai";
import pLimit from "p-limit";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// limit concurrency to 3 simultaneous model calls (tune as needed)




function buildPrompt(filename = "userfile.js", code = "") {
  return [
  // role
  "You are an expert senior software engineer and code reviewer. ONLY reply with pure JSON; do NOT include any markdown, triple-backticks, or commentary.",
  // strict rules
  `RULES:
- Return ONLY valid JSON. No markdown, no triple backticks, no fenced code blocks.
- Do NOT add any explanation outside the JSON.
- Do NOT include leading/trailing backticks or language tags.
- If you cannot analyze, return a valid JSON with empty arrays/strings.

JSON schema:
{
  "summary": "short one-line summary",
  "issues": ["..."],
  "suggestions": ["..."],
  "refactor": "short improved code snippet as a string"
}

Start response immediately with the JSON object.`,
  // the code payload
  `Filename: ${filename}
Code:
${code}`

  ]
}

function cleanModelOutput(str) {
  if (!str || typeof str !== "string") return str ?? "";

  // Remove common fenced code block markers and language tags
  let s = str.replace(/```(?:json|javascript|js)?/gi, "");
  // Remove single-line triple backticks or other fences
  s = s.replace(/```/g, "");
  // Remove leading/trailing quotes sometimes added accidentally
  s = s.trim();

  // If the model returns markdown code blocks like: > ```json\n{...}\n```
  // remove any leading quote characters or markdown blockquote >
  s = s.replace(/^(>\s*)+/gm, "");

  return s.trim();
}
export async function requestCodeReview({ code, filename = "userfile.js" }) {
  const contents = buildPrompt(filename, code);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });
  // different SDKs expose outputs differently — common property is `.text`
  const text = response?.text ?? response?.output ?? String(response);
const cleaned = cleanModelOutput(text);
  // try parse JSON (best-effort)
  let parsed = null;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    // parsing failed — return raw text for fallback
  }

  return { raw: text, parsed };
}
