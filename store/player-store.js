import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getSongLyric } from "../service/api_player"
import { parseLyric } from '../utils/parse-lyric'

const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
  state: {
    id: 0,
    currentSong: {},
    durationTime: 0,
    lyricInfos: [],

    currentTime: 0,
    currentLyricText: "",
    currentLyricIndex: 0,

    isPlaying: false,
    playModeIndex: 0
  },
  actions: {
    playMusicWithSongIdAction(ctx, { id }) {
      ctx.id = id
      // 请求歌曲详情和歌词数据
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })
      getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        ctx.lyricInfos = parseLyric(lyricString)
      })
      // 播放歌曲
      // 
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true
      ctx.isPlaying = true

      // 监听audioContext的一些事件
      this.dispatch("setupAudioContextListenerAction")
    },
    setupAudioContextListenerAction(ctx) {
      // 监听歌曲可以播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })
      //监听时间改变
      audioContext.onTimeUpdate(() => {
        // 获取当前时间
        const currentTime = audioContext.currentTime * 1000
        if (!ctx.lyricInfos.length) return
        // 根据当前时间修改currentTime
        ctx.currentTime = currentTime
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
    },
    changeMusicPlayStatus(ctx) {
      ctx.isPlaying = !ctx.isPlaying
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    }

  }
})

export {
  audioContext,
  playerStore
}