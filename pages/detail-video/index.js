// pages/detail-video/index.js
import { getMvData, getMvUrl, getAllvideo } from "../../service/api_video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const _this = this
    const id = options.id
    //1.请求播放地址
    getMvData(id).then(res => {
      _this.setData({ mvData: res.data })
    })
    //2.请求视频信息
    getMvUrl(id).then(res => {
      console.log("url", res);
    })
    //3.请求相关视频
    getAllvideo(id).then(res => {
      console.log("all", res);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})