export const FOLDER_ACTIONS_TYPES = {
  GET_FOLDER: 'GET_FOLDER',
  ADD_FOLDER: 'ADD_FOLDER',
  UPDATE_FOLDER: 'UPDATE_FOLDER',
  REMOVE_FOLDER: 'REMOVE_FOLDER',
  CLEAR_FOLDER: 'CLEAR_FOLDER'
}

export const folderReducer = (state, action) => {
  const { type, payload } = action
  const { GET_FOLDER, ADD_FOLDER, UPDATE_FOLDER, REMOVE_FOLDER, CLEAR_FOLDER } = FOLDER_ACTIONS_TYPES

  switch (type) {
    case GET_FOLDER:
      return {
        ...state,
        folders: payload
      }
    case ADD_FOLDER:
      return {
        ...state,
        folders: [
          ...state.folders,
          payload
        ]
      }
    case UPDATE_FOLDER: {
      const { id } = payload
      const newFolders = state.folders.map(folder => folder.id === id ? payload : folder)
      return {
        ...state,
        folders: newFolders
      }
    }
    case REMOVE_FOLDER: {
      const newFolders = state.folders.filter(folder => folder.id !== payload)
      return {
        ...state,
        folders: newFolders
      }
    }
    case CLEAR_FOLDER:
      return {
        ...state,
        folders: []
      }
    default:
      return state
  }
}
