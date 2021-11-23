import { RefObject, useCallback, useEffect, useState } from "react";

export function useClick <T extends HTMLElement> ( ref: RefObject<T>, handleClick: () => void ) {
    useEffect(() => {
        const currentRef = ref.current;
        currentRef?.addEventListener('click', handleClick);
        return () => {
          currentRef?.removeEventListener('click', handleClick);
        };
    }, [ ref, handleClick ]);
  return []
};

export function useClickWithCallback <T extends HTMLElement> ( ref: RefObject<T> ) {
  const [ islick, setClick ] = useState({ });

  const handleMouseDown = useCallback(() => {

  }, [])

  const handleMouseUp = useCallback(() => {

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

  return []
};


export default useClick;
