// pages/home-music/index.js
import { rankingStore } from "../../store/index"

import { getBanner, getSongMenu} from "../../service/api_music"
import queryRect from "../../utils/query-rect"
import throttle from "../../utils/throttle"

const throttleQueryRect = throttle(queryRect)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    swiperHeight: 0,
    recommendSongs: [],
    hotSongMenu: [],
    recommendSongMenu: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取页面数据
    this.getPageData()
    //发起共享数据请求
    rankingStore.dispatch("getRankingDataAction")
    //从store获取共享的数据
    rankingStore.onState("hotRanking", res => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({ recommendSongs })
    })
  },
  //网络请求
  getPageData() {
    getBanner().then(res => {
      this.setData({ banners: res.banners })
    })
    getSongMenu().then(res => {
      this.setData({ hotSongMenu: res.playlists })
    })
    getSongMenu("华语").then(res => {
      this.setData({ recommendSongMenu: res.playlists })
    })
  },
  //事件处理
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },
  handleSwiperImageLoaded() {
    //获取图片高度（如果去获取某一个组件的高度）
    throttleQueryRect(".swiper-image").then(res => {
      this.setData({ swiperHeight: res[0].height })
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  }
})