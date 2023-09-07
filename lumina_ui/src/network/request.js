import axios from 'axios'
import { message } from 'antd'
import nProgress from 'nprogress'
import { USER_TOKEN } from 'contants'
import { storageThatExpries } from 'utils'
import { baseUrl } from './baseUrl'

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8"

// nProgress.inc(0.2)
nProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = storageThatExpries.get(USER_TOKEN)
    nProgress.start()
    return config
  },
  err => {
    nProgress.done()
    Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    nProgress.done()
    return response.data
  },
  err => {
    nProgress.done()
    // 获取请求失败之后的状态码
    if (err.response && err.response.status === 403) {
      message.error('身份令牌过期，请重新登录！')
      // 删除旧的token
      storageThatExpries.remove(USER_TOKEN)
      // 跳转到登录页
      window.location.href = '#/login'
      return Promise.reject(err)
    }
    let { message: msg } = err
    if (msg === "Network Error") {
      msg = '网络错误，请检查网络！'
    } else if (msg.includes('timeout')) {
      msg = '服务器接口请求超时'
    } else if (msg.includes('Request failed with status code')) {
      msg = `服务器接口${msg.substr(msg.length - 3)}异常`
    }
    message.destroy()
    message.error(msg)
    return Promise.reject(err)
  }
)

export default instance