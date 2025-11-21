import { GoogleGenAI } from "@google/genai";
import pLimit from "p-limit";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// limit concurrency to 3 simultaneous model calls (tune as needed)
const limit = pLimit(3);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

console.log("Loaded key:", process.env.GEMINI_API_KEY);

function buildPrompt(filename = "userfile.js", code = "") {
  return [
    // role/system instruction
    "You are an expert senior software engineer and code reviewer.",
    // output format requirement
    `Task: Review the code below. Provide JSON with keys:
{
  "summary": "short one-line summary",
  "issues": ["list of main bugs or security issues"],
  "suggestions": ["style or correctness suggestions"],
  "refactor": "short improved code snippet (if applicable)"
}

Only output valid JSON — no extra commentary.`,
    // include the code block with language hint
    `Filename: ${filename}\n\`\`\`javascript\n${code}\n\`\`\``,
  ];
}

export async function requestCodeReview({ code, filename = "userfile.js" }) {
  const contents = buildPrompt(filename, code);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });
  // different SDKs expose outputs differently — common property is `.text`
  const text = response?.text ?? response?.output ?? String(response);

  // try parse JSON (best-effort)
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    // parsing failed — return raw text for fallback
  }

  return { raw: text, parsed };
}
