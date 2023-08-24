import ytdl from "ytdl-core"
import fs from 'fs'

export const downloader = (videoId) => new Promise((resolve, reject) => {
  const videoURL = 'https://youtube.com/watch?v=' + videoId
  console.log('[START_DOWNLOAD] ', videoURL) //information if arrived at the backend

  ytdl(videoURL, {
      quality: "lowestaudio", //quality-low (BX)
      filter: 'audioonly', //only necessary
    })
    .on('end', () => {
      console.log('[FINISHED_DOWNLOAD]')
      resolve()
    })

    .on('error', () => {
      console.log('[ERROR_DOWNLOAD]')
      reject('[ERROR_DOWNLOADING_VIDEO]')
    })

    //save video (only in .mp4)
    .pipe(fs.createWriteStream('audio.mp4'))
})