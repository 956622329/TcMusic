import { HYEventStore } from "hy-event-store"
import { getRankings } from "../service/api_music"
const rankingStore = new HYEventStore({
  state: {
    hotRanking: {},
    newRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    getRankingDataAction(ctx) {
      getRankings(24381616).then(res => {
        ctx.hotRanking = res.playlist
      })
      getRankings(2302705693).then(res => {
        ctx.newRanking = res.playlist
      })
      getRankings(311692545).then(res => {
        ctx.originRanking = res.playlist
      })
      getRankings(2420545066).then(res => {
        ctx.upRanking = res.playlist
      })
    }
  }
})
export {
  rankingStore
}