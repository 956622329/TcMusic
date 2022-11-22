// pages/music-player/index.js
import { audioContext, playerStore } from '../../../store/index'
const playModeNames = ["order", "repeat", "random"]
Page({
  data: {
    id: 0,
    currentSong: {},
    lyricInfos: [],
    durationTime: 0,

    currentTime: 0,
    currentLyricText: "",
    currentLyricIndex: 0,
    playModeIndex: 0,
    playModeName: "order",
    isPlaying: false,
    playingName: "resume",
    playSongList: [],
    playSongIndex: 0,

    isMusicLyric: true,
    isSliderChanging: false,
    sliderValue: 0,
    currentPage: 0,
    contentHeight: 0,
    lyricScrollTop: 0
  },

  onLoad(options) {
    const id = options.id
    // 根据歌单id获取歌曲信息
    this.setData({ id })
    this.setupPlayerStoreListener()
    // 动态计算content高度
    const globalData = getApp().globalData
    const contentHeight = globalData.screenHeight - globalData.statusBarHeight - globalData.NavBarHeight
    const deviceRadio = globalData.deviceRadio
    this.setData({ contentHeight, isMusicLyric: deviceRadio >= 2 })
    // 事件监听
  },
  //============================= 事件处理 ==============================
  handleSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },
  handleSliderChange(event) {
    // 获取slider变化的值
    const value = event.detail.value
    // 计算currentTime值
    const currentTime = value / 100000 * this.data.durationTime
    // 设置时间
    // audioContext.pause()
    audioContext.seek(currentTime)
    this.setData({ currentTime: currentTime * 1000, isSliderChanging: false })
  },
  handleSliderChanging(event) {
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime, isSliderChanging: true })
  },
  handlieBackBtnClick() {
    wx.navigateBack()
  },
  handleModeBtnClick() {
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex == 3) playModeIndex = 0
    this.setData({ playModeIndex })

    // 设置playerStore中的playModeIndex
    playerStore.setState("playModeIndex", playModeIndex)
  },
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },
  handlePrevBtnClick() {
    playerStore.dispatch("changeNewMusicAction", false)
  },
  handleNextBtnClick() {
    playerStore.dispatch("changeNewMusicAction")
  },
  // ============================= 数据监听 =======================
  setupPlayerStoreListener() {
    // 1.监听currentSong/durationTime/lyricInfos
    playerStore.onStates(["currentSong", "durationTime", "lyricInfos"], ({
      currentSong,
      durationTime,
      lyricInfos
    }) => {
      if (currentSong) this.setData({ currentSong })
      if (durationTime) this.setData({ durationTime })
      if (lyricInfos) this.setData({ lyricInfos })
    })
    // 2.监听currentTime/currentLyricIndex/currentLyricText
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
      currentTime, currentLyricIndex, currentLyricText
    }) => {
      // 时间变化
      if (currentTime && !this.data.isSliderChanging) {
        // 判断返回数据与设置数据是否相近相近，currentTime == 0切换歌曲时
        // if (Math.abs(currentTime - this.data.currentTime) < 2000 || currentTime == 0) {
        //   const sliderValue = currentTime / this.data.durationTime * 100
        //   this.setData({ currentTime, sliderValue })
        // }
        const sliderValue = currentTime / this.data.durationTime * 100
        this.setData({ currentTime, sliderValue })
      }
      // 歌词变化
      if (currentLyricIndex) {
        this.setData({ currentLyricIndex, lyricScrollTop: (currentLyricIndex + 1) * 35 })
      }
      if (currentLyricText) {
        this.setData({ currentLyricText })
      }
    })
    // 3.监听播放模式相关的数据
    playerStore.onStates(["isPlaying", "playModeIndex", "playSongList", "playSongIndex"], ({ isPlaying, playModeIndex, playSongList, playSongIndex }) => {
      if (playModeIndex !== undefined) {
        this.setData({ playModeIndex, playModeName: playModeNames[playModeIndex] })
      }
      if (isPlaying !== undefined) {
        this.setData({ isPlaying, playingName: isPlaying ? "pause" : "resume" })
      }
      if (playSongList != undefined) {
        this.setData({ playSongList })
      }
      if (playSongIndex !== undefined) {
        this.setData({ playSongIndex })
      }
    })
  },
  onUnload() {

  }
})