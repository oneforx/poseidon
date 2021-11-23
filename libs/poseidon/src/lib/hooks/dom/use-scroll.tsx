import React, { forwardRef, useCallback, useEffect, useState } from "react";

type ScrollPos = {
  x: number,
  y: number
}

function useScroll<T extends HTMLElement>( ref: React.RefObject<T> ) {
    const [scrollPos, setScrollPos] = useState<ScrollPos>({ x: 0, y: 0 });
    
    const handleScroll = useCallback(() => {
      // Get the current scroll position
      if (ref.current) {
        // Get the height of the page
        // const pageHeight = document.body.scrollHeight;
        // Check if the scroll position is greater than the height of the page
        setScrollPos(ref.current.scrollTop ? { x: 0, y: ref.current.scrollTop } : { x: 0, y: 0 });
      }
    }, [ ref ]);

    useEffect(() => {
        const currentRef = ref.current
        if ( currentRef !== null) {
          // Add an event listener on scrollAreaRef to get the scroll position
          currentRef.addEventListener("scroll", handleScroll, false);
        }
        return () => {
          if (currentRef !== null) {
            currentRef.removeEventListener("scroll", handleScroll);
          }
        }
    }, [ ref, handleScroll]);

    return { pos: scrollPos }
};

export default useScroll;