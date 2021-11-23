import { RefObject, useCallback, useEffect } from "react";


export const useTouch = <T extends HTMLElement>(ref: RefObject<T>) => {
  const onTouchStart = useCallback(
    (e) => {
      if (ref.current) {
        console.log(e);
      }
    },
    [ref]
  );

  const onTouchEnd = useCallback(
    (e) => {
      // console.log(e)
    },
    [ ref ]
  );

  const onTouchMove = useCallback(
    (e) => {
      // console.log(e)
    },
    [ref]
  );

  const onTouchCancel = useCallback(
    (e) => {
      // console.log(e)
    },
    [ref]
  );

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("touchend", onTouchEnd);
      currentRef.addEventListener("touchstart", onTouchStart);
      currentRef.addEventListener("touchmove", onTouchMove);
      currentRef.addEventListener("touchcancel", onTouchCancel);
    }
    return () => {
      if (currentRef) {
        currentRef.addEventListener("touchend", onTouchEnd);
        currentRef.addEventListener("touchstart", onTouchStart);
        currentRef.addEventListener("touchmove", onTouchMove);
        currentRef.addEventListener("touchcancel", onTouchCancel);
      }
    };
  }, [ onTouchEnd, onTouchCancel, onTouchStart, onTouchMove, ref]);

  return 0;
};
