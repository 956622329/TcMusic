// app.js
App({
  onLaunch() {
    const info = wx.getSystemInfoSync()
    this.globalData.screenHeight = info.screenHeight
    this.globalData.screenWith = info.screenWidth
  },
  globalData: {
    screenWith: 0,
    screenHeight: 0
  }

})
