// pages/detail-video/index.js
import { getMvData, getMvUrl, getAllvideo } from "../../service/api_video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvInfo: {},
    mvUrl: {},
    allVideo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.getVideoInfo(id)
  },
  getVideoInfo(id) {
    const _this = this
    //1.请求播放地址
    getMvData(id).then(res => {
      _this.setData({ mvInfo: res.data })
    })
    //2.请求视频信息
    getMvUrl(id).then(res => {
      _this.setData({ mvUrl: res.data })
    })
    //3.请求相关视频
    getAllvideo(id).then(res => {
      _this.setData({ allVideo: res.data })

    })
  }

})