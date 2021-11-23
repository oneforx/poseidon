import { RefObject, useCallback, useEffect, useState } from "react";

export function useDrag <T extends HTMLElement> ( ref: RefObject<T> ) {
  const [ isDragging, setIsDragging ] = useState(false);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(false)
  }, [])

  const handleMouseUp = useCallback((e) => {
    setIsDragging(true)
  }, [])

  useEffect(() => {
      const currentRef = ref.current;
      currentRef?.addEventListener('mousedown', handleMouseDown);
      currentRef?.addEventListener('mouseup', handleMouseUp);
      return () => {
        currentRef?.removeEventListener('mousedown', handleMouseDown);
        currentRef?.removeEventListener('mouseup', handleMouseUp);
      };
  }, [ ref, handleMouseDown, handleMouseUp ]);

  return isDragging
};

