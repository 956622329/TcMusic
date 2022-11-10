import tcRequest from "./index"
export function getSongDetail(ids) {
  return tcRequest.get("/song/detail", {
    ids
  })
}