import { SpeechApi } from '../api/SpeechApi'

export async function uploadFile (userData, formData) {
  const { id: userId } = userData
  try {
    const response = await SpeechApi.post(`/api/upload/media/${userId}`, formData)
    const responseData = await response.data
    return responseData
  } catch (error) {
    console.log(`Error al subir archivo multimedia con userId ${userId}`, error.response.data)
  }
}
