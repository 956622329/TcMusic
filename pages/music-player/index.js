// pages/music-player/index.js
import { getSongDetail, getSongUrl } from "../../service/api_player"
import { audioContext } from '../../store/index'
Page({
  data: {
    id: 0,
    currentSong: {},
    isMusicLyric: true,
    currentPage: 0,
    contentHeight: 0,
    durationTime: 0,
    currentTime: 0,
    sliderValue: 0,
    player: false,
    isSliderChanging: false
  },

  onLoad(options) {
    const id = options.id
    this.setData({ id })
    this.getPageData(id)
    // 动态计算content高度
    const globalData = getApp().globalData
    const contentHeight = globalData.screenHeight - globalData.statusBarHeight - globalData.NavBarHeight
    const deviceRadio = globalData.deviceRadio
    this.setData({ contentHeight, isMusicLyric: deviceRadio >= 2 })
    // 创建播放器
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true
    audioContext.onCanplay(() => {
      audioContext.play()
    })
    audioContext.onTimeUpdate(() => {
      const currentTime = audioContext.currentTime * 1000
      if (!this.data.isSliderChanging) {
        const sliderValue = currentTime / this.data.durationTime * 100
        this.setData({ currentTime, sliderValue })
      }
    })
  },
  // 网络请求
  getPageData(id) {
    getSongDetail(id).then(res => {
      this.setData({ currentSong: res.songs[0], durationTime: res.songs[0].dt })
    })

  },
  // 事件处理
  handleSiperChange(event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },
  handlePlayBtnClick() {
    if (!this.data.player) {
      audioContext.play()
      this.setData({ player: true })
    }
    else {
      audioContext.pause()
      this.setData({ player: false })
    }
  },
  handleSliderChange(event) {
    // 获取slider变化的值
    const value = event.detail.value
    // 计算currentTime值
    const currentTime = value / 100000 * this.data.durationTime
    // 设置时间
    audioContext.pause()
    audioContext.seek(currentTime)
    this.setData({ currentTime: currentTime * 1000, isSliderChanging: false })
  },
  handleSliderChanging(event) {
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime, isSliderChanging: true })
  },
  onUnload() {

  }

})