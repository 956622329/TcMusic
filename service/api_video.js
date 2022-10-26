import tcRequest from "./index"
export function getTopMv(offset,limit=10){
return tcRequest.get("/top/mv",{
  offset,
  limit
})
}