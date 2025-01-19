import { useState, useCallback } from 'react'

const useMutateData = <T, R = T>(
	url: string,
	initialData: T,
	method: 'PATCH' | 'PUT' | 'POST' | 'DELETE' = 'PATCH'
  ) => {
	const [data, setData] = useState<T>(initialData)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
  
	const mutate = useCallback(
	  async (updates: R) => {
		setLoading(true)
		setError(null)
		try {
		  const response = await fetch(url, {
			method,
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(updates),
		  })
  
		  if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Something went wrong')
		  }
  
		  const responseData = await response.json()
		  setData(responseData)
		  return responseData
		} catch (err: any) {
		  setError(err.message)
		  throw err 
		} finally {
		  setLoading(false)
		}
	  },
	  [url, method]
	)
  
	return { data, mutate, loading, error }
  }
  

const usePutData = <T, R = T>(url: string, initialData?: T) =>
	useMutateData(url, initialData, 'PUT')

const usePostData = <T, R = T>(url: string, initialData?: T) =>
	useMutateData(url, initialData, 'POST')

const useDeleteData = <T, R = T>(url: string, initialData?: T) =>
	useMutateData(url, initialData, 'DELETE')

const usePatchData = <T, R = T>(url: string, initialData?: T) =>
	useMutateData(url, initialData, 'PATCH')

export { useMutateData, usePutData, usePostData, useDeleteData, usePatchData }