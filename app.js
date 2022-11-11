// app.js
App({
  onLaunch() {
    const info = wx.getSystemInfoSync()
    this.globalData.screenHeight = info.screenHeight
    this.globalData.screenWith = info.screenWidth
    this.globalData.statusBarHeight = info.statusBarHeight
    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio
  },
  globalData: {
    screenWith: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    NavBarHeight: 55,
    deviceRadio: 0
  }

})
