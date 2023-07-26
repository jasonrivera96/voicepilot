import { useRef, useState, useCallback } from 'react'
import { makeQuery } from '../services/SearchService'

export function useQuery ({ searchQuery }) {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousQuery = useRef(searchQuery)

  const getResources = useCallback(async ({ searchQuery, userData }) => {
    if (searchQuery === previousQuery.current) return
    try {
      setLoading(true)
      setError(null)
      previousQuery.current = searchQuery
      const data = await makeQuery(userData, searchQuery)
      setResources(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResources = useCallback(() => {
    setResources([])
  }, [])

  return { resources, getResources, clearResources, loading, error }
}
