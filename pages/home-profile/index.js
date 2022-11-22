// pages/home-profile/index.js
import { getUserInfo } from "../../service/api_login"
Page({
  data: {

  },
  onLoad(options) {

  },
  onUnload() {

  },
  async handleGetUser(event) {
    //获取用户的信息
    const userInfo = await getUserInfo()
    console.log(userInfo);
  }
})