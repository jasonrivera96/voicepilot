import { VoicePilotApi } from '../api/VoicePilotApi'

export async function makeQuery (userData, query) {
  if (query === '') return
  const { id: userId, token } = userData
  let responseData
  try {
    const response = await VoicePilotApi.get(`/api/search/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        query
      }
    })
    responseData = await response.data
    return responseData
  } catch (error) {
    console.log(`Error al recuperar la query ${query} con el UserId ${userId} `, error.response.data)
  }
  return []
}
