import { VoicePilotApi } from '../api/VoicePilotApi'

export async function loadFolders (userData) {
  const { id, token } = userData
  try {
    const response = await VoicePilotApi.get(`/api/folder/all/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const responseFolder = response.data
    return responseFolder
  } catch (error) {
    console.log(`Error al recuperar las carpetas del usuario con id ${id}`, error.response.data)
  }
  return []
}

export async function createFolder (userData, folderName) {
  const { id, token } = userData
  let responseData
  try {
    const response = await VoicePilotApi.post('/api/folder', {
      name: folderName,
      userId: id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    responseData = await response.data
  } catch (error) {
    console.log(`Error al crear la carpeta ${folderName} para el usuario con id ${id}`, error.response.data)
  }
  return responseData
}

export async function updateFolder (userData, folderItem) {
  const { token } = userData
  const { id, name } = folderItem
  let responseData
  try {
    const response = await VoicePilotApi.put(`/api/folder/${id}`, {
      name
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    responseData = response.data
  } catch (error) {
    console.log(`Error al actualizar la carpeta ${name} con id ${id}`, error.response.data)
  }
  return responseData
}

export async function deleteFolder (userData, folderId) {
  const { token } = userData
  let responseData
  try {
    const response = await VoicePilotApi.delete(`/api/folder/${folderId}`, {
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
