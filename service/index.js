import { TOKEN_KEY } from "../constants/token-const"
const token = wx.getStorageSync(TOKEN_KEY)

const BASE_URL = "http://123.207.32.32:9002"

const LOGIN_BASE_URL = "http://123.207.32.32:3000"
//本地服务器
// const LOGIN_BASE_URL = "http://localhost:3000"

class TCRequest {
  constructor(baseUrl, authHeader = {}) {
    this.baseUrl = baseUrl
    this.authHeader = authHeader
  }
  request(url, method, params, isAuth, header = {}) {
    const finalHeader = isAuth ? { ...this.authHeader, ...header } : header

    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        data: params,
        method: method,
        header: finalHeader,
        timeout: 0,
        success: res => { resolve(res.data) },
        fail: reject
      })
    })
  }
  get(url, params, iaAuth = false, header) {
    return this.request(url, "GET", params, iaAuth, header)
  }
  post(url, data, iaAuth = false, header) {
    return this.request(url, "POST", data, iaAuth, header)
  }
}

const tcRequest = new TCRequest(BASE_URL)

const tcLoginRequest = new TCRequest(LOGIN_BASE_URL, {
  token
})

export default tcRequest
export {
  tcLoginRequest
}