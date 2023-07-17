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
    return responseData
  } catch (error) {
    console.log(`Error al recuperar los summaries del userId ${userId} y folderId ${folderId} `, error.response.data)
  }
  return []
}

export async function getSummary (userData, summaryId) {
  const { id: userId, token } = userData
  try {
    const response = await VoicePilotApi.get(`/api/summary/${summaryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.data
    return responseData
  } catch (error) {
    console.log(`Error al recuperar el summary con id ${userId}`, error.response.data)
  }
  return []
}

export async function updateSummary (userData, summaryItem) {
  const { token } = userData
  const { id, name } = summaryItem
  let responseData
  try {
    const response = await VoicePilotApi.put(`/api/summary/${id}`, {
      titulo: name
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    responseData = response.data
    return responseData
  } catch (error) {
    console.log(`Error al actualizar el summary ${name} con id ${id}`, error.response.data)
  }
}

export async function deleteSummary (userData, summaryId) {
  const { token } = userData
  let responseData
  try {
    const response = await VoicePilotApi.delete(`/api/summary/${summaryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    responseData = response
  } catch (error) {
    console.log(error.response.data)
  }
  return responseData
}
