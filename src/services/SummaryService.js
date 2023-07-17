import { VoicePilotApi } from '../api/VoicePilotApi'

export async function loadSummaries (userData, folderId) {
  const { id: userId, token } = userData
  try {
    const response = await VoicePilotApi.get(`/api/summary/all/${userId}/folder/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.data
    console.log('recuperando datos')
    return responseData
  } catch (error) {
    console.log(`Error al recuperar los resúmenes del userId ${userId} y folderId ${folderId} `, error.response.data)
  }
  return []
}
