// pages/detaill-menu/index.js
import { getSongMenu } from "../../service/api_music"
Page({
  data: {
    menu: []
  },
  onLoad(options) {
    const tag = ["华语", "古风", "欧美", "影视原声", "怀旧", "摇滚", "浪漫", "民谣", "粤语", "流行"]
    for (let i of tag) {
      getSongMenu(i, 6).then(res => {
        let newMenu = this.data.menu
        newMenu.push(res)
        this.setData({ menu: newMenu })
      })
    }
  },
  onUnload() {

  },
  handleMenuItemClick(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail-songs/index?id=${id}&type=menu`,
    })
  }
})