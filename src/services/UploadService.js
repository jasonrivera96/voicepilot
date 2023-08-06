import { SpeechApi } from '../api/SpeechApi'

let controller = null

export async function uploadFile (userData, formData) {
  controller = new AbortController()
  const { id: userId } = userData
  try {
    const response = await SpeechApi.post(`/api/upload/media/${userId}`, formData, {
      signal: controller.signal
    })
    const responseData = await response.data
    return responseData
  } catch (error) {
    if (error?.name === 'CanceledError') {
      console.log('Subida de archivo multimedia cancelada')
    } else {
      console.log(`Error al subir archivo multimedia con userId ${userId}`, error?.response?.data)
    }
  }
}

export function cancelUpload () {
  controller.abort()
}
