import { RefObject, useCallback, useEffect, useState } from "react";

type Position = { x: number, y: number}

export function useMousePosition <T extends HTMLElement> ( ref: RefObject<T> ) {
  const [ pos, setPos ] = useState<{ layer: Position, client: Position}>({ layer: { x: 0, y: 0}, client: { x: 0, y: 0} });

  const handleMouseMove = useCallback((e) => {
    setPos({
      client: { x: e.clientX, y: e.clientY },
      layer: { x: e.layerX, y: e.layerY }
    })
  }, [])

  useEffect(() => {
    const currentRef = ref.current;
    currentRef?.addEventListener('mousemove', handleMouseMove, true);
    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ ref, handleMouseMove ]);

  return pos
};

export default useMousePosition;
