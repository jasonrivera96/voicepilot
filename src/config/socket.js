import { io } from 'socket.io-client'
// import { SERVER_URL } from '../config/config'
import { BASE_URL_SPEECH } from '../config/config'
const socket = io(BASE_URL_SPEECH, {
  autoConnect: false
})

socket.connect()

socket.on('connect', () => {
  console.log('connected')
})

socket.on('disconnect', () => {
  console.log('disconnected')
})

export default socket
