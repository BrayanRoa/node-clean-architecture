export class NotFoundError extends Error {
    constructor(entity: string, key?: string) {
        const formatted = key
            ? `The ${entity} with id ${key} was not found`
            : `The ${entity} was not found`;
        super(formatted);
        this.name = "NotFoundError";
    }
}