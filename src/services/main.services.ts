import axios from '../api/http-common'

const post = async <T>(data: T, endpoint: string, formData?: boolean) => {
  return await axios.post<T>(
    `v1/${endpoint}/`,
    data,
    formData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
  )
}

const get = async (endpoint: string, data?: any) => {
  return await axios.get(`v1/${endpoint}`, data)
}

const HttpService = {
  get,
  post
}

export default HttpService