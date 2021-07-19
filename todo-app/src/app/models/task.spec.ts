import { Task } from './task';

describe('Task', () => {
    it('Criando uma instância', () => {
        const app = new Task();
        expect(app).toBeTruthy();
    });

    it ('Validando valores no construtor', () => {
        let task = new Task({
            title: 'hello',
            complete: true
        });
        expect(task.title).toEqual('hello');
        expect(task.complete).toEqual(true);
    })
});
