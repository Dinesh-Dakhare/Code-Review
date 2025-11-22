import {requestCodeReview} from "../services/ai.service.js";

export async function reviewCode(req, res, next) {
  try {
    const { code, filename } = req.body;
    console.log("👍backend get data",req.body)
    if (!code) return res.status(400).json({ error: "Missing code in request body" });

    const result = await requestCodeReview({ code, filename });

    // return both raw text and parsed JSON (if model returned JSON)
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}
