import axios from 'axios'
const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})
service.interceptors.request.use((config) => config)
service.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})
export default service
