import tcRequest from "./index"
export function getSongDetail(ids) {
  return tcRequest.get("/song/detail", {
    ids
  })
}
export function getSongUrl(id, level = "exhigh") {
  return tcRequest.get("/song/url/v1", {
    id,
    level
  })
}