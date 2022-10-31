// pages/home-music/index.js
import { rankingStore } from "../../store/index"

import { getBanner } from "../../service/api_music"
import queryRect from "../../utils/query-rect"
import throttle from "../../utils/throttle"

const throttleQueryRect = throttle(queryRect)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    swiperHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取页面数据
    this.getPageData()
    //发起共享数据请求
    rankingStore.dispatch("getRankingDataAction")
  },
  //网络请求
  getPageData() {
    getBanner().then(res => {
      this.setData({ banners: res.banners })
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