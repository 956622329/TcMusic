import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getSongLyric } from "../service/api_player"
import { parseLyric } from '../utils/parse-lyric'

// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

const playerStore = new HYEventStore({
  state: {
    isFirstPlay: true,
    isStoping: false,

    id: 0,
    currentSong: {},
    durationTime: 0,
    lyricInfos: [],

    currentTime: 0,
    currentLyricText: "",
    currentLyricIndex: 0,

    isPlaying: false,
    playModeIndex: 0,
    playSongList: [],
    playSongIndex: 0,

    isWarting: false,
    onTimeUpdate: null
  },
  actions: {
    playMusicWithSongIdAction(ctx, { id, isRefresh = false }) {
      if (id == ctx.id && !isRefresh) {
        this.dispatch("changeMusicPlayStatusAction", true)
        return
      }
      ctx.id = id
      // 
      // clearInterval(ctx.onTimeUpdate)
      // 修改播放状态
      ctx.isPlaying = true
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricText = ""
      ctx.currentLyricIndex = 0
      // 请求歌曲详情和歌词数据
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
        audioContext.title = res.songs[0].name
      })
      getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        ctx.lyricInfos = parseLyric(lyricString)
      })
      // 播放歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.title = id
      audioContext.autoplay = true
      // 监听audioContext的一些事件
      if (ctx.isFirstPlay) {
        this.dispatch("setupAudioContextListenerAction")
        ctx.isFirstPlay = false
      }
    },
    cancelAudioContextListener(ctx) {
      clearInterval(ctx.onTimeUpdate)
    },
    setupAudioContextListenerAction(ctx) {
      // 监听歌曲可以播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })
      audioContext.onTimeUpdate(() => {
        // 获取当前时间
        const currentTime = audioContext.currentTime * 1000
        // 根据当前时间修改currentTime
        ctx.currentTime = currentTime
        if (!ctx.lyricInfos.length) return
        // 根据当前时间查查找播放的歌词
        const lyricInfos = ctx.lyricInfos
        for (let i = 0; i < lyricInfos.length; i++) {
          if (lyricInfos[i].time > currentTime) {
            if (ctx.currentLyricIndex != i - 1) {
              // 记录歌词当前index，避免重复设置data
              ctx.currentLyricText = lyricInfos[i - 1].lyricText
              ctx.currentLyricIndex = i - 1
            }
            break
          }
          else if (i == lyricInfos.length - 1 && lyricInfos[i].time < currentTime) {
            if (ctx.currentLyricIndex == i) break
            ctx.currentLyricText = lyricInfos[i].lyricText
            ctx.currentLyricIndex = i
          }
        }
      })
      audioContext.onEnded(() => {
        this.dispatch("changeNewMusicAction")
      })
      // //监听时间改变
      // ctx.onTimeUpdate = setInterval(() => {
      //   // 获取当前时间
      //   const currentTime = audioContext.currentTime * 1000
      //   if (!ctx.lyricInfos.length) return
      //   // 根据当前时间修改currentTime
      //   ctx.currentTime = currentTime
      //   // 根据当前时间查查找播放的歌词
      //   const lyricInfos = ctx.lyricInfos
      //   for (let i = 0; i < lyricInfos.length; i++) {
      //     if (lyricInfos[i].time > currentTime) {
      //       if (ctx.currentLyricIndex != i - 1) {
      //         // 记录歌词当前index，避免重复设置data
      //         ctx.currentLyricText = lyricInfos[i - 1].lyricText
      //         ctx.currentLyricIndex = i - 1
      //       }
      //       break
      //     }
      //     else if (i == lyricInfos.length - 1 && lyricInfos[i].time < currentTime) {
      //       if (ctx.currentLyricIndex == i) break
      //       ctx.currentLyricText = lyricInfos[i].lyricText
      //       ctx.currentLyricIndex = i
      //     }
      //   }
      // }, 350)

      //监听音乐暂停/播放
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      audioContext.onStop(() => {
        ctx.isPlaying = false
        ctx.isStoping = true
      })
    },
    changeMusicPlayStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying
      if (ctx.isPlaying) {
        audioContext.play()
        // this.dispatch("setupAudioContextListenerAction")
      }
      else {
        audioContext.pause()
        // this.dispatch("cancelAudioContextListener")
      }
    },
    changeNewMusicAction(ctx, isNext = true) {
      let index = ctx.playSongIndex
      const list = ctx.playSongList
      switch (ctx.playModeIndex) {
        case 0:
          if (!isNext) {
            index = index - 1
            if (index == -1) index = list.length - 1
            break
          }
          else {
            index = index + 1
            if (index == list.length) index = 0
          }
        case 1:
          break
        case 2:
          index = Math.floor(Math.random() * list.length)
          break
      }
      const id = list[index].id
      ctx.playSongIndex = index
      this.dispatch("playMusicWithSongIdAction", { id })
    }
  }
})

export {
  audioContext,
  playerStore
}