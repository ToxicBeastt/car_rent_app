import { useState, useEffect } from 'react'

const useGetData = <T, R = T>(
	url: string,
	options?: {
		normalizer?: (response: R) => T
		enabled?: boolean
		params?: { [key: string]: string }
	},
	dependencies?: string[]
) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { enabled = true, normalizer, params: initialParams } = options || {}
	const dependecy = dependencies || []
	const urlParams = new URLSearchParams(initialParams).toString()

	const fetchData = async (params?: { [key: string]: string } | string): Promise<T | null> => {
		const queryString = typeof params === 'string' ? params : new URLSearchParams(params).toString();

		try {
			const response = await fetch(`${url}?${queryString}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(response)
			if (!response.ok) {
				const errorData = await response.json();
				setError(errorData.message || 'Something went wrong');
				return null; // Return null on error
			} else {
				const ResponseJson: R = await response.json();
				const normalizedData = normalizer ? await normalizer(ResponseJson) : ResponseJson;
				setData(normalizedData as T);
				return normalizedData as T; // Return fetched data
			}
		} catch (err: any) {
			setError(err.message);
			console.error('Fetch error:', err);
			return null;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (enabled) fetchData(urlParams)
	}, [url, enabled, urlParams, ...dependecy])

	const refetch = async (
		newParams?: { [key: string]: string } | { params: { [key: string]: string } } | string
	): Promise<T | null> => {
		if (newParams) {
			if (typeof newParams === 'string') {
				return await fetchData(newParams);
			} else if ('params' in newParams) {
				return await fetchData(newParams.params);
			} else {
				return await fetchData(newParams);
			}
		} else {
			return await fetchData(initialParams);
		}
	};

	return { data, loading, refetch, error }
}

export default useGetData