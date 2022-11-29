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
export function getMvUrl(id) {
  return tcRequest.get("/mv/url", {
    id
  })
}
export function getVideoData(id) {
  return tcRequest.get("/video/detail", {
    id
  })
}
export function getVideoUrl(id) {
  return tcRequest.get("/video/url", {
    id
  })
}
export function getAllvideo(id) {
  return tcRequest.get("/related/allvideo", {
    id
  })
}