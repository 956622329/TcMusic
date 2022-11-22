import { tcLoginRequest } from "../service/index"

export function getLoginCode() {
  return new Promise((reslove, reject) => {
    wx.login({
      timeout: 100,
      success: res => {
        const code = res.code
        reslove(code);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

export function codeToTaken(code) {
  return tcLoginRequest.post("/login", { code })
}
export function checkToken() {
  return tcLoginRequest.post("/auth", {}, true)
}
export function checkSession() {
  return new Promise((reslove, reject) => {
    wx.checkSession({
      success: () => {
        reslove(true)
      },
      err: () => {
        reject(false)
      }
    })
  })
}
export function getUserInfo() {
  return new Promise((reslove, reject) => {
    wx.getUserProfile({
      desc: '雷猴aaa',
      success: (res) => {
        reslove(res)
      },
      err:(err)=>{
        reject(err)
      }
    })
  })
}