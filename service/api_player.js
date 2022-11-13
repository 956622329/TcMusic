import tcRequest from "./index"
export function getSongDetail(ids) {
  return tcRequest.get("/song/detail", {
    ids
  })
}
export function getSongLyric(id) {
  return tcRequest.get("/lyric", {
    id
  })
}