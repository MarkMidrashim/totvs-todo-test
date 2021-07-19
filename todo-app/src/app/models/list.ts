export class List {
    id: number = 0;
    title: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
