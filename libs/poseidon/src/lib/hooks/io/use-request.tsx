import { useCallback, useEffect, useMemo } from "react";
import { useState } from "react"
import { useDidMount } from "..";

type useRequestReturn <T> = [
  { data: T | null, isLoading: boolean, error: any },
  ( rInit?: RequestInit ) => void
];

type TResponse <T> = {
  data: T | null,
  isLoading: boolean,
  error: any
}

export function useRequest <T> ( requestInfo: RequestInfo, requestInit?: RequestInit | null, fetchOnMount?: boolean ): useRequestReturn<T> {
  const [ response, setResponse ] = useState<TResponse<T>>({
    data: null,
    isLoading: false,
    error: null
  })
  const didMount = useDidMount()

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

  const fetchIt = useCallback(( rInit?: RequestInit ) => {
    fetch(requestInfo, Object.assign({}, requestInit, Object.assign({}, {method: "GET", mode: "cors" }, rInit)))
    .then(res => {
      setResponse({
        ...response,
        isLoading: true
      });
      return res.json()
    })
    .then(res => {
      setResponse({
        ...response,
        isLoading: false,
        data: res
      });
    })
    .catch( err => {
      setResponse({
        ...response,
        error: err
      });
    })
  }, [requestInfo, requestInit, response]);

  // Abort request when component unmount
  useEffect(() => {
    const controller = getAbortController() ? new AbortController() : null;
    const signal = controller ? controller.signal : null

    if ( !didMount && fetchOnMount )
      fetchIt({ signal });

    return () => {
      if ( didMount && fetchOnMount )
        controller?.abort();
    }
  }, [didMount, getAbortController, fetchOnMount, fetchIt]);



  return [
    response,
    fetchIt
  ];
}
