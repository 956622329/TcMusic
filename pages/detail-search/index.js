// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from "../../service/api_search"
import debounce from "../../utils/debounce"
import { stringToNodes } from "../../utils/string2node"
const debounceGetSearchSuggeest = debounce(getSearchSuggest)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeyWord: [],
    suggestSongs: [],
    suggestSongsNodes: [],
    resultSongs: [],
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
  //事件处理
  handleSearchChange(event) {
    const searchValue = event.detail
    // //保存关键字
    this.setData({ searchValue })
    //判断关键字为空字符的处理逻辑
    if (!searchValue.length) {
      this.setData(({ suggestSongs: [] }))
      this.setData({ resultSongs: [] })
      return
    }
    //根据关键字进行搜索
    debounceGetSearchSuggeest(searchValue).then(res => {
      if (!res.result.allMatch) return
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs })
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
  },
  handleSearchAction() {
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
      this.setData({ resultSongs: res.result.songs })
    })
  },
  handleSuggestItemClick(event) {
    // 1.获取点击的关键字
    const keyword = event.currentTarget.dataset.keyword
    // 2.将关键设置到searchValue中
    this.setData({ searchValue: keyword })
    // 3.发送网络请求
    this.handleSearchAction()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  }

})