import express from 'express'
import router from './routes/ai.routes.js'
export const app = express()

app.use(express.json())

app.use("/ai", router)