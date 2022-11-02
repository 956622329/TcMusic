// components/song-menu-area/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songMenu: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: "默认歌单"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWith: app.globalData.screenWith,
    srceenHeight: app.globalData.srceenHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
