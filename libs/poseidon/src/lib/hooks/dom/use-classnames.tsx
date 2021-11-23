import { useMemo } from "react";

export const useClassnames = (classNames: Record<string, unknown>) => {
  return useMemo(() => Object.keys(classNames).filter( key => classNames[key] === true).join(" "), [ classNames ]);
}

export default useClassnames;