// pages/detail-songs/index.js
import { rankingStore } from "../../store/index"
import { getRankings } from "../../service/api_music"
Page({
  data: {
    ranking: "",
    songInfo: {},
    type: ""
  },
  onLoad(options) {
    const type = options.type
    this.setData({ type })

    if (type === 'menu') {
      const id = options.id
      getRankings(id).then(res => {
        this.setData({ songInfo: res.playlist })
      })
    }
    else if (type === 'rank') {
      const ranking = options.ranking
      this.setData({ ranking })
      rankingStore.onState(ranking, this.getRankingDataHandler)
    }
  },
  handleSongItemClick: function (event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.songInfo.tracks)
    playerStore.setState("playListIndex", index)
  },
  onUnload() {
    if (this.data.ranking) {
      rankingStore.offState(this.data.ranking, this.getRankingDataHandler)
    }
  },
  getRankingDataHandler(res) {
    this.setData({ songInfo: res })
  }
})