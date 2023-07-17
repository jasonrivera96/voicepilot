import { AuthApi } from '../api/AuthApi'

export async function loadFolders (userData) {
  const { id, token } = userData
  try {
    const response = await AuthApi.get(`/api/folder/all/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const responseFolder = response.data
    console.log(responseFolder)
    return responseFolder
  } catch (error) {
    console.log(`Error al recuperar las carpetas del usuario con id ${id}`, error.response.data)
  }
  return []
}
