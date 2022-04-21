import { useEffect, useState } from "react";

export function useDidMount(callback?: () => void): boolean {
  const [ didMount, setDidMount ] = useState(false);

  useEffect(() => {
    if (didMount != true && callback) callback();
    setDidMount(true)
  }, [ didMount, callback ]);

  return didMount
}

export default useDidMount;
