export class Error {
    title: string = '';
    message: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
