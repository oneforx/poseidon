import { useEffect } from "react";

export function useOnEveryUpdateOf ( doCb: () => void, undoCb: () => void, deps: Record<string, unknown>) {
    useEffect(() => {
        if (typeof doCb === "function") doCb(); 
        return () => {
            if (typeof undoCb === "function") undoCb(); 
        }
    }, [ deps, doCb, undoCb]);
}