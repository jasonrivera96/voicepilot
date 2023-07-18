import axios from 'axios'
import { BASE_URL_SPEECH } from '../config'

export const SpeechApi = axios.create({
  baseURL: BASE_URL_SPEECH,
  headers: {
    'Content-Type': 'application/json'
  }
})
