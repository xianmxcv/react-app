import axios from 'axios'

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return new Promise((resolve) => {
      resolve(response)
    })
  },
  (error) => {
    return new Promise((_resolve, reject) => {
      if (error.response) {
        reject(error.response.mesg + '\n' + error.response.data)
      } else {
        reject(error.message)
      }
    })
  }
)

const api = {}

export default api
