import axios from 'axios'
import { BASE_URL_VOICEPILOT } from '../config/config'

export const VoicePilotApi = axios.create({
  baseURL: BASE_URL_VOICEPILOT,
  headers: {
    'Content-Type': 'application/json'
  }
})
