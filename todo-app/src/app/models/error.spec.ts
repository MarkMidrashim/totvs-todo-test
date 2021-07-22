import { Error } from './error';

describe('Error', () => {
    it('Criando uma instância', () => {
        const app = new Error();
        expect(app).toBeTruthy();
    });

    it ('Validando valores no construtor', () => {
        let todo = new Error({
            title: 'hello',
            message: 'hello'
        });
        expect(todo.title).toEqual('hello');
        expect(todo.message).toEqual('hello');
    })
});
