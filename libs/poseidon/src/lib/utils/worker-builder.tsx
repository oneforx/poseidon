export default class WorkerBuilder extends Worker {
    constructor (worker: Function, options?: WorkerOptions) {
        const code = worker.toString();
        const blob = new Blob([`(${code})()`]);
        super(URL.createObjectURL(blob), { name: "TranslationWorker" });
    }
}