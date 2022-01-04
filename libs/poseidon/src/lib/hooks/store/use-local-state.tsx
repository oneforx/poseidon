import { SetStateAction, useCallback, useEffect, useState } from "react";

/**
 * @param {*} itemName
 * @returns { null | object }
 */
function getLocalItem <T> (itemName: string): T | undefined {
    const itemValue: string | null | Record<string, unknown> | [] | number = localStorage.getItem(itemName);
    if (itemValue) {
        return JSON.parse(itemValue || '{}').value as T;
    } else return undefined;
}

// On stock sous le format json le type et la valeur de l'item
function setLocalItem <T> (itemName: string, itemValue?: T ): T | undefined {
    if (typeof(itemValue) === "object") {
        if (Array.isArray(itemValue)) {
            localStorage.setItem(itemName, JSON.stringify({ type: "array", value: itemValue }))
        } else {
            localStorage.setItem(itemName, JSON.stringify({ type: "object", value: itemValue }))
        }
    } else localStorage.setItem(itemName, JSON.stringify({ type: typeof(itemValue), value: itemValue }));

    return getLocalItem(itemName);
}

/**
 * @author Hermann
 * @param { String | null} stateName
 * @param {*} stateValue
 * @description Create, update, destroy a localItem of localStorage and at the same time store it in localState
 */
export function useLocalState <T> (stateName: string, stateValue?: T ): [
  T | undefined,
  ((newValue: T) => void ),
  () => void
] {
    const [ localState, setLocalState ] = useState<T | undefined>( getLocalItem(stateName) || setLocalItem(stateName, stateValue));

    useEffect(() => {
      if ( !localStorage ) throw new Error("LocalStorage isn't available")
    }, []);

    // On mount : IF LOCAL ITEM DOESNT EXIST & STATE VALUE IS NOT UNDEFINED -> CREATE
    // On mount : IF LOCAL ITEM EXIST & STATE VALUE IS NOT UNDEFINED & IS NOT EQUAL TO LOCAL ITEM VALUE -> OVERWRITE
    useEffect(() => {
        const localItem = getLocalItem<T>( stateName )
        localItem === undefined && stateValue !== undefined ? setLocalState( setLocalItem(stateName, stateValue) ) : setLocalState( localItem )
        // localItem !== undefined && stateValue !== undefined && stateValue !== localItem ? setLocalState( setLocalItem(stateName, stateValue) ) : setLocalState( localItem )
    }, [ stateName, stateValue ])

    const handleDeleteLocalItem = useCallback(( stateName: string ) => {
      localStorage.removeItem(stateName);
      setLocalState(undefined)
      return undefined
    }, []);

    return [
        /* GET */   localState,
        /* PUT */   ( newValue: T ) => setLocalState( setLocalItem(stateName, newValue) ),
        /* DEL */   () => setLocalState( handleDeleteLocalItem(stateName)  )
    ]
}

export default useLocalState;
