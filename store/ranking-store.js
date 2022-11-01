import { HYEventStore } from "hy-event-store"
import { getRankings } from "../service/api_music"
const rankingStore = new HYEventStore({
  state: {
    hotRanking: {}
  },
  actions: {
    getRankingDataAction(ctx) {
      getRankings(24381616).then(res => {
        ctx.hotRanking = res.playlist
      })
    }
  }
})
export {
  rankingStore
}