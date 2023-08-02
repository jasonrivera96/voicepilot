import { useContext, useReducer } from 'react'
import { folderReducer, FOLDER_ACTIONS_TYPES } from '../reducers/FolderReducer'
import { createFolder, deleteFolder, loadFolders, updateFolder } from '../services/FolderService'
import { AuthContext } from '../context/AuthContext'
import { useNotificationContext } from '../context/NotificationContext'

const initialState = {
  folders: [],
  loading: false,
  error: null
}

export function useFolderReduce () {
  const [state, dispatch] = useReducer(folderReducer, initialState)
  const { userData } = useContext(AuthContext)
  const { setNotification } = useNotificationContext()

  const { GET_FOLDER, ADD_FOLDER, UPDATE_FOLDER, REMOVE_FOLDER, CLEAR_FOLDER } = FOLDER_ACTIONS_TYPES

  const getFolders = async () => {
    try {
      const data = await loadFolders(userData)
      dispatch({
        type: GET_FOLDER,
        payload: data
      })
    } catch (error) {
      console.log('Error al cargar las carpetas: ', error)
      dispatch({ type: GET_FOLDER, payload: [] })
    }
  }

  const addFolder = async (folderName) => {
    try {
      const data = await createFolder(userData, folderName)
      const { id, name } = data
      dispatch({
        type: ADD_FOLDER,
        payload: {
          id,
          name
        }
      })
      setNotification({
        message: 'Carpeta creada',
        level: 'success'
      })
    } catch (error) {
      console.log('Error al agregar la carpeta: ', error)
      setNotification({
        message: 'Error al crear la carpeta',
        level: 'error'
      })
    }
  }

  const updateFolde = async (folder) => {
    try {
      const data = await updateFolder(userData, folder)
      dispatch({
        type: UPDATE_FOLDER,
        payload: data
      })
      setNotification({
        message: 'Carpeta actualizada',
        level: 'success'
      })
    } catch (error) {
      console.log('Error al actualizar la carpeta: ', error.response)
      setNotification({
        message: 'Error al actualizar la carpeta',
        level: 'error'
      })
    }
  }

  const removeFolder = async (folder) => {
    const { id } = folder
    try {
      await deleteFolder(userData, id)
      dispatch({
        type: REMOVE_FOLDER,
        payload: id
      })
      setNotification({
        message: 'Carpeta eliminada',
        level: 'success'
      })
    } catch (error) {
      console.log('Error al eliminar la carpeta: ', error)
      setNotification({
        message: 'Error al eliminar la carpeta',
        level: 'error'
      })
    }
  }

  const clearFolder = () => {
    dispatch({ type: CLEAR_FOLDER })
  }

  return { state, getFolders, addFolder, updateFolde, removeFolder, clearFolder }
}
