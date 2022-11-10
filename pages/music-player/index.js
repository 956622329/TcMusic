// pages/music-player/index.js
import { getSongDetail } from "../../service/api_player"
Page({
  data: {
    id: 0,
    currentSong: {},
    currentPage: 0,
    contentHeight: 0
  },

  onLoad(options) {
    const id = options.id
    this.setData({ id })
    this.getPageData(id)
    // 动态计算content高度
    const globalData = getApp().globalData
    const contentHeight = globalData.screenHeight - globalData.statusBarHeight - globalData.NavBarHeight
    this.setData({ contentHeight })
  },
  // 网络请求
  getPageData(id) {
    getSongDetail(id).then(res => {
      this.setData({ currentSong: res.songs[0] })

    })
  },

  onUnload() {

  }

})