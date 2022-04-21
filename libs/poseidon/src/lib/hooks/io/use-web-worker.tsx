import { useCallback, useEffect, useMemo, useState } from "react";
import WorkerBuilder from "../../utils/worker-builder";


type OnMessageFunction = (
    (message: MessageEvent<any>) => void
)


type OnErrorFunction = (
    (message: ErrorEvent) => void
)

export const useWebWorker = (
    worker: Function,
    onMesssage?: OnMessageFunction,
    onMessageError?: OnMessageFunction,
    onError?: OnErrorFunction
) => {
    const [ messages, setMessages ] = useState([]);
    
    const newWorker = useMemo(() => {
        return window.Worker ? new WorkerBuilder(worker) : null;
    }, [])

    const builtInOnMessage = useCallback((message: MessageEvent<any>) => {
        console.log("builtIn", message);
    }, []);

    const builtInOnMessageError = useCallback((message: MessageEvent<any>) => {
        console.error("builtIn", message);
    }, []);

    const builtInOnError = useCallback((message: ErrorEvent) => {
        console.error("builtIn", message);
    }, []);

    useEffect(() => {
        if (newWorker) {
            newWorker.onmessage = (message) => onMesssage ? onMesssage(message) : builtInOnMessage(message);
            newWorker.onmessageerror = (message) => onMessageError ? onMessageError(message) : builtInOnMessageError(message);
            newWorker.onerror = (message) => onError ? onError(message) : builtInOnError(message);
        }
    }, []);

    return newWorker;
}

export default useWebWorker;
