import { RefObject, useEffect } from "react";
import { useCallback } from "react"

export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {

  const handleClick = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }, [callback, ref]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    }
  });
}
