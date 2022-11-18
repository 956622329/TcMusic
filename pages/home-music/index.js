// pages/home-music/index.js
import { rankingStore, rankingMap, playerStore } from "../../store/index"

import { getBanner, getSongMenu } from "../../service/api_music"
import queryRect from "../../utils/query-rect"
import throttle from "../../utils/throttle"

const throttleQueryRect = throttle(queryRect, 1000, { trailing: true })
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    swiperHeight: 0,
    hotSongMenu: [],
    recommendSongMenu: [],
    recommendSongs: [],
    rankings: {},

    currentSong: {},
    isPlaying: false,
    playSongList: [],
    playSongIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取页面数据
    this.getPageData()

    this.setupPlayerStoreListener()
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
  handleMoreClick() {
    this.navigateToDetailSongsPage("hotRanking")
  },
  handleRankingItemClick(event) {
    const idx = event.currentTarget.dataset.idx;
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongsPage(rankingName)
  },
  navigateToDetailSongsPage(rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },
  getRankingHandler(idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      const name = res.name
      const imgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = { name, imgUrl, songList, playCount }
      const newRankings = { ...this.data.rankings, [idx]: rankingObj }
      this.setData({ rankings: newRankings })
    }
  },
  handleSongItemClick: function (event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.recommendSongs)
    playerStore.setState("playListIndex", index)
  },
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },
  handlePlayBarClick() {
    wx.navigateTo({
      url: '/pages/music-player/index?id=' + this.data.currentSong.id,
    })
  },
  // ============================= 数据监听 =======================
  setupPlayerStoreListener() {
    //排行榜监听
    //发起共享数据请求
    rankingStore.dispatch("getRankingDataAction")
    //从store获取共享的数据
    rankingStore.onState("hotRanking", res => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({ recommendSongs })
    })
    rankingStore.onState("newRanking", this.getRankingHandler(0))
    rankingStore.onState("originRanking", this.getRankingHandler(1))
    rankingStore.onState("upRanking", this.getRankingHandler(2))
    //播放器监听
    // 1.监听currentSong/durationTime/lyricInfos
    playerStore.onStates(["currentSong", "isPlaying"], ({ currentSong, isPlaying }) => {
      if (currentSong) {
        this.setData({ currentSong })
      }
      if (isPlaying !== undefined) {
        this.setData({ isPlaying })
      }
    })
  },
})