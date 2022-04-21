import { useMemo } from "react";

export const useClassnames = (classNames: Record<string, boolean> | Array<string> ) => {
  return useMemo(() => Array.isArray(classNames) ? classNames.join(" ") : Object.keys(classNames).filter( key => classNames[key] === true).join(" "), [ classNames ]);
}

export default useClassnames;
