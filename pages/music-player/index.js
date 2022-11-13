// pages/music-player/index.js
import { getSongDetail, getSongLyric } from "../../service/api_player"
import { parseLyric } from '../../utils/parse-lyric'
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
    isSliderChanging: false,
    currentLyricText: "",
    currentLyricIndex: 0,
    lyricInfos: [],
    lyricScrollTop: 0
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
    this.setData({ player: true })
    // 事件监听
    this.setupAudioContextListener()
  },
  // ================================ 网络请求 ==============================
  getPageData(id) {
    getSongDetail(id).then(res => {
      this.setData({ currentSong: res.songs[0], durationTime: res.songs[0].dt })
    })
    getSongLyric(id).then(res => {
      const lyricString = res.lrc.lyric
      const lyricInfos = parseLyric(lyricString)
      this.setData({ lyricInfos })
    })
  },
  // ========================== audio监听 ==============================
  setupAudioContextListener() {
    audioContext.onCanplay(() => {
      audioContext.play()
    })
    //监听时间改变
    audioContext.onTimeUpdate(() => {
      // 获取当前时间
      const currentTime = audioContext.currentTime * 1000
      // 根据当前时间修改currentTime、sliderValue
      if (!this.data.isSliderChanging) {
        const sliderValue = currentTime / this.data.durationTime * 100
        this.setData({ currentTime, sliderValue })
      }
      // 根据当前时间查查找播放的歌词
      const lyricInfos = this.data.lyricInfos
      for (let i = 0; i < lyricInfos.length; i++) {
        if (lyricInfos[i].time > currentTime) {
          if (this.data.currentLyricIndex != i - 1) {
            // 记录歌词当前index，避免重复设置data
            this.setData({ currentLyricText: lyricInfos[i - 1].lyricText, currentLyricIndex: i - 1, lyricScrollTop: i * 35 })
            console.log(lyricInfos[i - 1].lyricText);
          }
          break
        }
        else if (i == lyricInfos.length - 1 && lyricInfos[i].time < currentTime) {
          if (this.data.currentLyricIndex == i) break
          this.setData({ currentLyricText: lyricInfos[i].lyricText, currentLyricIndex: i })
        }
      }
    })
  },
  //============================= 事件处理 ==============================
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