import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    timeout: 20000
  }
})
