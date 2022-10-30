const BASE_URL = "http://123.207.32.32:9002"

class TCRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        data: params,
        method: method,
        timeout: 0,
        success: res => { resolve(res.data) },
        fail: reject
      })
    })
  }
  get(url, params) {
    return this.request(url, "GET", params)
  }
  post(url, data) {
    return this.request(url, "POST", data)
  }
}
const tcRequest = new TCRequest()
export default tcRequest