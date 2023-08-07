import axios from 'axios'
import { SERVER_URL } from '../config/config'

export const SpeechApi = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
