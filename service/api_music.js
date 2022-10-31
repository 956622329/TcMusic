import tcRequest from "./index"
export function getBanner() {
  return tcRequest.get("/banner")
}
export function getRankings(idx) {
  return tcRequest.get("/top/list", {
    idx
  })
}