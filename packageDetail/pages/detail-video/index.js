// pages/detail-video/index.js
import { getMvData, getMvUrl, getAllvideo, getVideoUrl, getVideoData } from "../../../service/api_video"
import timeFormat from "../../../utils/data-fomat"
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
    console.log(options);
    const id = options.id
    const more = options.more
    this.getVideoInfo(id, more)
  },
  getVideoInfo(id, more) {

    const _this = this
    if (more) {
      getVideoUrl(id).then(res => {
        _this.setData({ mvUrl: res.urls[0] })
      })
      getVideoData(id).then(res => {
        res.data.publishTime = timeFormat(res.data.publishTime)
        _this.setData({ mvInfo: res.data })
        console.log("1", res);
      })
    } else {
      //1.请求播放地址
      getMvUrl(id).then(res => {
        _this.setData({ mvUrl: res.data })
      })
      //2.请求视频信息
      getMvData(id).then(res => {
        _this.setData({ mvInfo: res.data })
        console.log("2", res);
      })
    }

    //3.请求相关视频
    getAllvideo(id).then(res => {
      _this.setData({ allVideo: res.data })
    })
  },
  handleVideoItemClick(event) {
    const id = event.currentTarget.dataset.item.vid
    wx.navigateTo({
      url: `/packageDetail/pages/detail-video/index?id=${id}&more=1`,
    })
  }
})