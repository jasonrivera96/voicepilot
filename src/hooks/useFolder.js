import { useContext } from 'react'
import { FolderContext } from '../context/FolderContext'

export function useFolder () {
  const context = useContext(FolderContext)
  if (context === undefined) {
    throw new Error('useFolder debe estar dentro del proveedor FolderContext')
  }
  return context
}
