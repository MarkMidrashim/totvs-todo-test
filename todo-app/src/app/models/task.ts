export class Task {
    id: number = 0;
    listId: number = 0;
    title: string = '';
    complete: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
