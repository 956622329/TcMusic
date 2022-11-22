// app.js
import { getLoginCode, codeToTaken, checkToken, checkSession } from "./service/api_login"
import { TOKEN_KEY } from "./constants/token-const"
App({
  globalData: {
    screenWith: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    NavBarHeight: 55,
    deviceRadio: 0
  },
  onLaunch() {
    //获取了设备信息
    const info = wx.getSystemInfoSync()
    this.globalData.screenHeight = info.screenHeight
    this.globalData.screenWith = info.screenWidth
    this.globalData.statusBarHeight = info.statusBarHeight

    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio

    //让用户默认进行登录
    this.handleLogin()
  },
  async handleLogin() {
    const token = wx.getStorageSync(TOKEN_KEY)
    const checkResult = await checkToken()
    const isSessionExpire = await checkSession()
    if (!token || checkResult.errorCode || !isSessionExpire) {
      this.loginAction()
    }
  },
  async loginAction() {
    const code = await getLoginCode()
    console.log(code);

    const result = await codeToTaken(code)
    console.log(result);
    const token = result.token
    wx.setStorageSync(TOKEN_KEY, token)

  }

})
