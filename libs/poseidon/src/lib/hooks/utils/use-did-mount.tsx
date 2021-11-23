import { useEffect } from "react";

export function useDidMount(callback: () => void): void {
  useEffect(() => {
    if (callback) callback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useDidMount;
