export class MaxNumberCheckInsError extends Error {
    constructor() {
        super('Max of number check-ins reached.')
    }
}