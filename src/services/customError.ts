export default class CustomError extends Error {
    private status: number;
    private error: string;
    private path?: string;

    constructor(status: number, error: string) {
        super();
        this.status = status;
        this.error = error;
    }

    get errorStatus() {
        return this.status;
    }

    get errorObject() {
        return {
            status: this.status,
            error: this.error,
            path: this.path
        }
    }

    set apiPath(path: string) {
        this.path = path;
    }
}