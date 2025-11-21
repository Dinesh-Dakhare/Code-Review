import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const reviewCode = async (filename, code) => {
  const response = await apiClient.post('/review-code', {
    filename,
    code
  })
  return response.data
}