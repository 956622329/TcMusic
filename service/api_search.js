import tcRequest from "./index"
export function getSearchHot() {
  return tcRequest.get("/search/hot")
}
export function getSearchSuggest(keywords, type = 'mobile') {
  return tcRequest.get("/search/suggest", {
    keywords,
    type
  })
}