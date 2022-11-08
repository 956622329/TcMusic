// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest } from "../../service/api_search"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeyWord: [],
    suggestSongs: [],
    searchValue: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData()
  },
  //网络请求
  getPageData() {
    getSearchHot().then(res => {
      this.setData({ hotKeyWord: res.result.hots })
    })
  },
  //时间处理
  handleSearchChange(event) {
    const searchValue = event.detail
    this.setData({ searchValue })
    if (!searchValue.length) return
    getSearchSuggest(searchValue).then(res => {
      this.setData({ suggestSongs: res.result.allMatch })
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  }

})