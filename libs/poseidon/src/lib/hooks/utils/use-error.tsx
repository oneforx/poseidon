import { useMemo } from "react";
/**
 * 
 * @param errors Record<string, boolean>
 * @returns 
 */
export const useError = ( errors: Record<string, boolean> ) => useMemo(
    () => Object.keys(errors).filter(
        (err) => errors[err] === true
    ),
    [ errors ]
);