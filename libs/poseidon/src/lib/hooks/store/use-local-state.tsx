import { SetStateAction, useCallback, useEffect, useState } from "react";

/**
 *
 * @param {*} itemName
 * @returns { null | object }
 */
function getLocalItem <T> (itemName: string): T | undefined {
    if (!localStorage) return undefined;
    const itemValue: string | null | Record<string, unknown> | [] | number = localStorage.getItem(itemName);
    if (itemValue) {
        return JSON.parse(itemValue || '{}').value;
    } else return undefined;
}


type StateValue = Record<string, unknown> | [] | string | number | boolean

// On stock sous le format json le type et la valeur de l'item
function setLocalItem <T> (itemName: string, itemValue?: T ): T | undefined {
    if (!localStorage) return undefined;
    if (typeof(itemValue) === "object") {
        if (Array.isArray(itemValue)) {
            localStorage.setItem(itemName, JSON.stringify({ type: "array", value: itemValue }))
        } else {
            localStorage.setItem(itemName, JSON.stringify({ type: "object", value: itemValue }))
        }
    } else localStorage.setItem(itemName, JSON.stringify({ type: typeof(itemValue), value: itemValue }));

    return getLocalItem(itemName);
}

const removeLocalItem = (itemName: string) => {
    if (!localStorage) return undefined;
    localStorage.removeItem(itemName)
    return ;
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
        const localItem = getLocalItem<T>( stateName )
        localItem === null ? setLocalState( setLocalItem(stateName, stateValue) ) : setLocalState( localItem )
    }, [ stateName, stateValue ])

    useEffect(() => {
      const localItem = getLocalItem( stateName )
      // if (localItem !== null && (typeof(stateValue) !== typeof(localItem) && (typeof(stateValue) !== "undefined" && stateValue !== null)))
        // setLocalState( setLocalItem( stateName, stateValue ))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      // window.addEventListener("storage", (e) => {
      // });
    }, []);

    const handleDeleteLocalItem = useCallback(( stateName: string ) => {
      localStorage.removeItem(stateName);
      setLocalState(undefined)
    }, []);

    return [
        /* GET */   localState,
        /* PUT */   ( newValue: T ) => setLocalState( setLocalItem(stateName, newValue) ),
        /* DEL */   () => setLocalState( removeLocalItem(stateName)  )
    ]
}

export default useLocalState;
