import tcRequest from "./index"
export function getBanner() {
  return tcRequest.get("/banner")
}

export function getRankings(id) {
  return tcRequest.get("/playlist/detail", {
    id
  })
}

export function getSongMenu(cat = "全部", limit = 10, offset = 0) {
  return tcRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}