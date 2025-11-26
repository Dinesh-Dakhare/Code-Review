import express from 'express'
import router from './routes/ai.routes.js'
import cors from 'cors'
export const app = express()

app.use(express.json())
app.use(cors())
app.use("/ai", router)


app.get('/', (req, res) => {
  res.send('Hello World!')
})