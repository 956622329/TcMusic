import tcRequest from "./index"
export function getTopMv(offset, limit = 10) {
  return tcRequest.get("/top/mv", {
    offset,
    limit
  })
}
export function getMvData(mvid) {
  return tcRequest.get("/mv/detail", {
    mvid
  })
}
export function getMvUrl(id, r = 1080) {
  return tcRequest.get("/mv/url", {
    id,
    r
  })
}
export function getAllvideo(id) {
  return tcRequest.get("/related/allvideo", {
    id
  })
}