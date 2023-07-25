import React, { createContext } from 'react'
import { useFolderReduce } from '../hooks/useFolderReduce'

export const FolderContext = createContext()

export function FolderProvider ({ children }) {
  const { state, getFolders, addFolder, updateFolde, removeFolder, clearFolder } = useFolderReduce()
  return (
    <FolderContext.Provider value={{ state, getFolders, addFolder, updateFolde, removeFolder, clearFolder }}>
      {children}
    </FolderContext.Provider>
  )
}
