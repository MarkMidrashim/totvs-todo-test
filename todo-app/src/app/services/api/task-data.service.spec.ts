import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskDataService } from './task-data.service';
import { Task } from '../../models/task';

describe('TaskDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskDataService]
        });
    });

    it('Validando se foi criado', inject([TaskDataService], (service: TaskDataService) => {
        expect(service).toBeTruthy();
    }));

    describe('#getAllTasks()', () => {
        it('Testando a listagem (vazio) de tarefas', inject([TaskDataService], (service: TaskDataService) => {
            service.getAllTasks(1).then(value => expect(value).toEqual([]));
        }));

        it('Testando a listagem de tarefas', inject([TaskDataService], (service: TaskDataService) => {
            let todo1 = new Task({ title: 'Hello 1', listId: 1, complete: false });
            let todo2 = new Task({ title: 'Hello 2', listId: 1, complete: true });
            service.addTask(todo1);
            service.addTask(todo2);

            service.getAllTasks(1).then(value => {
                expect(value).toEqual([todo1, todo2]);
            });
        }));
    });

    describe('#addTask(todo)', () => {
        it('Testando a inclusão de tarefas', inject([TaskDataService], (service: TaskDataService) => {
            let todo1 = new Task({ title: 'Hello 1', listId: 1, complete: false });
            let todo2 = new Task({ title: 'Hello 2', listId: 1, complete: true });
            service.addTask(todo1);
            service.addTask(todo2);
            service.getTaskById(1).then(value => expect(value).toEqual(todo1));
            service.getTaskById(2).then(value => expect(value).toEqual(todo2));
        }));
    });

    describe('#deleteTask(id)', () => {
        it('Testando a remoção de tarefas', inject([TaskDataService], (service: TaskDataService) => {
            let todo1 = new Task({ title: 'Hello 1', listId: 1, complete: false });
            let todo2 = new Task({ title: 'Hello 2', listId: 1, complete: true });
            service.addTask(todo1);
            service.addTask(todo2);

            service.getAllTasks(1).then(value => {
                expect(value).toEqual([todo1, todo2]);
                service.deleteTask(1);
            });

            service.getAllTasks(1).then(value => {
                expect(value).toEqual([todo2]);
                service.deleteTask(2);
            });

            service.getAllTasks(1).then(value => {
                expect(value).toEqual([]);
            });
        }));
    });

    describe('#updateTask(todo)', () => {
        it('Testando se a tarefa é atualizada', inject([TaskDataService], (service: TaskDataService) => async() => {
            let todo = new Task({ title: 'Hello 1', listId: 1, complete: false });
            service.addTask(todo);
            todo.title = 'New Title';
            let updatedTask = await service.updateTask(todo);
            expect(updatedTask.title).toEqual('New Title');
        }));
    });

    describe('#completeTask(todo)', () => {
        it('Testando se o status da tarefa é completado', inject([TaskDataService], (service: TaskDataService) => async() => {
            let todo = new Task({ title: 'Hello 1', listId: 1, complete: false });
            service.addTask(todo);
            todo.complete = true;
            let updatedTask = await service.updateTask(todo);
            expect(updatedTask.complete).toEqual(true);
        }));
    });
});
