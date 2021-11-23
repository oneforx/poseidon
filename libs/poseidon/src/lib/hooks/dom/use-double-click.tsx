import { createRef, forwardRef, Ref, RefObject, useCallback, useEffect, useState } from "react";

export const useDoubleClick = (ref: RefObject<HTMLElement>, callback: () => void, msDetector: number)  => {
    const [ clickTimes, setClickTimes ] = useState<number[]>([]);
    const [ sinceLastClick, setSinceLastClick ] = useState(0);

    useEffect(() => {
        if (clickTimes.length > 1) setSinceLastClick(clickTimes[ clickTimes.length - 1] - clickTimes[clickTimes.length - 2])
    }, [clickTimes])

    const handleClick = useCallback((e) => {
        setClickTimes([ ...clickTimes, Date.now() ])
    }, [ clickTimes ]);

    useEffect(() => {
        if (sinceLastClick !== 0 && sinceLastClick < msDetector) {
          callback();
          setSinceLastClick(0)
          setClickTimes([])
        }
    }, [ sinceLastClick, callback, msDetector ])

    useEffect(() => {
        const currentRef = ref.current;
        currentRef && currentRef.addEventListener('click', handleClick);
        return () => {
          currentRef && currentRef.removeEventListener('click', handleClick);
        };
    });
}
