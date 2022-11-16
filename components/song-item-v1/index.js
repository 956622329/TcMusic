// components/song-item-v1/index.js
import { playerStore } from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    playSongList: {
      type: Array,
      value: []
    },
    playSongIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSongItemClick() {
      const id = this.properties.item.id
      // 页面跳转
      wx.navigateTo({
        url: '/pages/music-player/index?id=' + id,
      })
      // 歌曲信息请求
      playerStore.dispatch("playMusicWithSongIdAction", { id })
      playerStore.setState("playSongList", this.properties.playSongList)
      playerStore.setState("playSongIndex", this.properties.playSongIndex)
    }
  }
})
