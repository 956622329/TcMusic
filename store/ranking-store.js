import { HYEventStore } from "hy-event-store"
import { getRankings } from "../service/api_music"
const rankingStore = new HYEventStore({
  state: {
    hotRanking: {}
  },
  actions: {
    getRankingDataAction() {
      getRankings(1).then(res => {
        console.log(res);
      })
    }
  }
})
export {
  rankingStore
}