import axios from "axios"
import {
  startLoading,
  stopLoading,
  loadingMessage
} from "./loading"
import {
  getVideoId,
  loadVideo
} from "./youtube-api"
import {
  transcribeAudio
} from "./transcribe"
import {
  renderText
} from "./render"

const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {
    loadingMessage('Starting the application')
    startLoading()

    const formData = new FormData(form)
    const url = formData.get('url')
    //console.log(url)
    await loadVideo(url)

    //download and convert video
    loadingMessage('Downloading and converting the video')
    //connection front-end witch back-end
    await axios.get('http://localhost:3333/audio?v=' + getVideoId(url))

    const data = await transcribeAudio()
    renderText(data)
    console.log(data)
  } catch (error) {
    console.log('[SUBMIT_ERROR]', error)
  } finally {
    stopLoading()
  }
})