import { useCallback, useEffect, useMemo } from "react";
import { useState } from "react"

type useRequestReturn = [
  { data: any, isLoading: boolean, error: any },
  ( rInit?: Record<string, unknown> ) => void
];

export function useRequest ( requestInfo: RequestInfo, requestInit: RequestInit, fetchOnMount?: boolean ): useRequestReturn {
  const [ data, setData ] = useState<any>(null)
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null)

  /**
   * @description Tell us if the browser have the AbortController
   * @returns Boolean
   */
  const getAbortController = useCallback(() => {
    if ( "AbortController" in window ) {
      return true
    } else {
      return false;
    }
  }, []);

  const fetchIt = useCallback(( rInit = {} ) => {
    setIsLoading(true);
    fetch(requestInfo, Object.assign({}, requestInit, rInit))
    .then(res => {
      setIsLoading(false);
      return res.json()
    })
    .then(res => {
      setIsLoading(false)
      setData(res)
    })
    .catch( err => {
      setIsLoading(false);
      setError(err)
    })
}, [requestInfo, requestInit]);

  // Abort request when component unmount
  useEffect(() => {
    const controller = getAbortController() ? new AbortController() : null;
    const signal = controller ? controller.signal : null

    if ( fetchOnMount )
      fetchIt({ signal });

    return () => {
      if ( fetchOnMount )
        controller?.abort();
    }
  }, []);



  return useMemo(() => [
    { data, isLoading, error },
    fetchIt
  ], [ data, isLoading, error, fetchIt ]);
}
