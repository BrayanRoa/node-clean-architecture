export class FieldAlreadyExistsError extends Error {
    constructor(field: string, value?: string) {
        const formatted = value
            ? `The ${field} "${value}" is already registered`
            : `This ${field} is already registered`;
        super(formatted);
        this.name = "FieldAlreadyExistsError";
    }
}