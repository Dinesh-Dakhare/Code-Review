import express from 'express'
import { reviewCode } from '../controller/reviewController.js'

const router = express.Router()

router.post('/code-review', reviewCode)



export default router