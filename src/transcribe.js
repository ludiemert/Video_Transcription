import {
  pipeline
} from "@xenova/transformers";
import {
  loadingMessage
} from "./loading";

//text fake
//import data from './data.json';

let data = null

export async function transcribeAudio() {
  //separate it into parts (chunks of text)
  const options = {
    chunk_length_s: 30,
    stride_length_s: 5,
    language: 'portuguese',
    task: 'transcribe',
    return_timestamps: true,
  }

  try {
    console.time()
    loadingMessage('Starting the audio transcription, this stage takes a long time... just wait')
    console.log('[START_TRANSCRIBE]')

    const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small')
    data = await transcriber('../audio.mp3', options)
  } catch (error) {
    console.log('[ERROR_TRANSCRIBE] ', error)
    throw new Error(error)
  } finally {
    console.timeEnd()
    loadingMessage('Transcription finished!')
    console.log('[STOP_TRANSCRIBE]')
    return data
  }

}