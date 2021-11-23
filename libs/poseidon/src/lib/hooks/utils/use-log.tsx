import { useEffect } from "react";

export const useLog = ( ...args: unknown[] ) => {
  useEffect(() => {
    args.forEach( _ => console.log(_) );
  }, [args]);
}

export default useLog;