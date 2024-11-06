export class ResourceNotExistError extends Error {
    constructor() {
        super('Invalid credentials.')
    }
}