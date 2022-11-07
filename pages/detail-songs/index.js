// pages/detail-songs/index.js
import { rankingStore } from "../../store/index"
Page({
  data: {
    ranking: "",
    rankingInfo: {}
  },
  onLoad(options) {
    const ranking = options.ranking
    rankingStore.onState(ranking, this.getRankingDataHandler)
  },
  onUnload() {
    rankingStore.offState(this.data.ranking, this.getRankingDataHandler)
  },
  getRankingDataHandler(res) {
    this.setData({ rankingInfo: res })
    console.log(this.data.rankingInfo);
  }
})