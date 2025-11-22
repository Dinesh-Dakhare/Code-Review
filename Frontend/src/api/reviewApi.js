import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3000/ai',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const reviewCode = async (filename, code) => {
  const response = await apiClient.post('/code-review', {
    filename,
    code
  })
  return response.data
}