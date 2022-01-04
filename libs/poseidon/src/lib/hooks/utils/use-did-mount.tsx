import { useEffect, useState } from "react";

export function useDidMount(callback?: () => void): boolean {
  const [ didMount, setDidMount ] = useState(false);

  useEffect(() => {
    if (callback) callback();
    setDidMount(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return didMount
}

export default useDidMount;
