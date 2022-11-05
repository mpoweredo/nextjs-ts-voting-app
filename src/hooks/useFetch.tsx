import { useState, useCallback } from 'react'

const useFetch = <T,>() => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<T>()
  const [error, setError] = useState('')

  const fetchData = useCallback(async (passedFn: () => Promise<T | undefined>) => {
    setIsLoading(true)
    try {
      const data = await passedFn()
      setData(data)

    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }

    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, fetchData }
}

export default useFetch
