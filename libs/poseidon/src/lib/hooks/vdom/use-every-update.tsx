import { useEffect } from "react";

export function useOnEveryUpdate ( doCb: () => void, undoCb: () => void ) {
    useEffect(() => {
        if (typeof doCb === "function") doCb(); 
        return () => {
            if (typeof undoCb === "function") undoCb(); 
        }
    });
}