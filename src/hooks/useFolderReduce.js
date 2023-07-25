import { useContext, useReducer } from 'react'
import { folderReducer, FOLDER_ACTIONS_TYPES } from '../reducers/FolderReducer'
import { createFolder, deleteFolder, loadFolders, updateFolder } from '../services/FolderService'
import { AuthContext } from '../context/AuthContext'

const initialState = {
  folders: [],
  loading: false,
  error: null
}

export function useFolderReduce () {
  const [state, dispatch] = useReducer(folderReducer, initialState)
  const { userData } = useContext(AuthContext)

  const { GET_FOLDER, ADD_FOLDER, UPDATE_FOLDER, REMOVE_FOLDER, CLEAR_FOLDER } = FOLDER_ACTIONS_TYPES

  const getFolders = async () => {
    try {
      const data = await loadFolders(userData)
      dispatch(
        {
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
    } catch (error) {
      console.log('Error al agregar la carpeta: ', error)
    }
  }

  const updateFolde = async (folder) => {
    try {
      const data = await updateFolder(userData, folder)
      dispatch({
        type: UPDATE_FOLDER,
        payload: data
      })
    } catch (error) {
      console.log('Error al actualizar la carpeta: ', error.response)
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
    } catch (error) {
      console.log('Error al eliminar la carpeta: ', error)
    }
  }

  const clearFolder = () => {
    dispatch({ type: CLEAR_FOLDER })
  }

  return { state, getFolders, addFolder, updateFolde, removeFolder, clearFolder }
}
