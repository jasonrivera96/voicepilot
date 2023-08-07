import axios from 'axios'
import { SERVER_URL } from '../config/config'

export const VoicePilotApi = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
