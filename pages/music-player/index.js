// pages/music-player/index.js
import { getSongDetail, getSongUrl } from "../../service/api_player"
Page({
  data: {
    id: 0,
    currentSong: {},
    isMusicLyric: true,
    currentPage: 0,
    contentHeight: 0,
    songUrl: '',
    durationTime: 0,
    audioContext: null
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
    getSongUrl(id).then(res => {
      const audioContext = wx.createInnerAudioContext({
        useWebAudioImplement: false // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
      })
      this.setData({ songUrl: res.data[0].url, audioContext })
      // audioContext.src = res.data[0].url
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // audioContext.play()
      // audioContext.pause()
      // audioContext.stop()
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
    this.data.audioContext.play()
  },
  onUnload() {

  }

})