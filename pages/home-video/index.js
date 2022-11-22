// pages/home-video/index.js
import { getTopMv } from "../../service/api_video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    mvUrl: {},
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTopMVData(0)
  },
  //封装网络请求
  async getTopMVData(offset) {
    //判断是否可以请求
    if (!this.data.hasMore && offset !== 0) return
    //请求数据
    const res = await getTopMv(offset)
    let newData = this.data.topMVs
    if (offset === 0) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
    }

    //设置数据
    this.setData({ topMVs: newData })
    this.setData({ hasMore: res.hasMore })
    wx.stopPullDownRefresh()
  },
  //封装事件处理的方法
  handleVideoItemClick(event) {
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/packageDetail/pages/detail-video/index?id=${id}`,
    })
  },
  //其他生命周期函数
  onPullDownRefresh() {
    this.getTopMVData(0)
  },
  onReachBottom() {
    this.getTopMVData(this.data.topMVs.length)
  }

})