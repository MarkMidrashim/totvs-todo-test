import { List } from './list';

describe('Todo', () => {
    it('Criando uma instância', () => {
        const app = new List();
        expect(app).toBeTruthy();
    });

    it ('Validando valores no construtor', () => {
        let todo = new List({
            title: 'hello'
        });
        expect(todo.title).toEqual('hello');
    })
});
