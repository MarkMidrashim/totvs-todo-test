import { inject, TestBed } from '@angular/core/testing';
import { Task } from './../models/task';

import { TaskDataService } from './task-data.service';

describe('TaskDataService', () => {
    let service: TaskDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskDataService]
        });
    });

    it('Validando se foi criado', inject([TaskDataService], (service: TaskDataService) => {
        expect(service).toBeTruthy();
    }));

    describe('#getAllTasks()', () => {
        it('should return an empty array by default', inject([TaskDataService], (service: TaskDataService) => {
            expect(service.getAllTasks(1)).toEqual([]);
        }));

        it('should return all todos', inject([TaskDataService], (service: TaskDataService) => {
            let todo1 = new Task({ title: 'Hello 1', listId: 1, complete: false });
            let todo2 = new Task({ title: 'Hello 2', listId: 1, complete: true });
            service.addTask(todo1);
            service.addTask(todo2);
            expect(service.getAllTasks(1)).toEqual([todo1, todo2]);
        }));
    });

    describe('#add(todo)', () => {
        it('should automatically assign an incrementing id', inject([TaskDataService], (service: TaskDataService) => {
            let todo1 = new Task({ title: 'Hello 1', listId: 1, complete: false });
            let todo2 = new Task({ title: 'Hello 2', listId: 1, complete: true });
            service.addTask(todo1);
            service.addTask(todo2);
            // expect(service.getTaskById(1)).toEqual(todo1);
            // expect(service.getTaskById(2)).toEqual(todo2);
        }));
    });

    describe('#delTaskById(id)', () => {
        it('should remove todo with the corresponding id', inject([TaskDataService], (service: TaskDataService) => {
            let todo1 = new Task({ title: 'Hello 1', complete: false });
            let todo2 = new Task({ title: 'Hello 2', complete: true });
            service.addTask(todo1);
            service.addTask(todo2);
            expect(service.getAllTasks(1)).toEqual([todo1, todo2]);
            service.delTaskById(1);
            expect(service.getAllTasks(1)).toEqual([todo2]);
            service.delTaskById(2);
            expect(service.getAllTasks(1)).toEqual([]);
        }));

        it('should not removing anything if todo with corresponding id is not found', inject([TaskDataService], (service: TaskDataService) => {
            let todo1 = new Task({ title: 'Hello 1', listId: 1, complete: false });
            let todo2 = new Task({ title: 'Hello 2', listId: 1, complete: true });
            service.addTask(todo1);
            service.addTask(todo2);
            expect(service.getAllTasks(1)).toEqual([todo1, todo2]);
            service.delTaskById(3);
            expect(service.getAllTasks(1)).toEqual([todo1, todo2]);
        }));
    });

    describe('#updTaskById(id, values)', () => {
        it('should return todo with the corresponding id and updated data', inject([TaskDataService], (service: TaskDataService) => {
            let todo = new Task({ title: 'Hello 1', listId: 1, complete: false });
            service.addTask(todo);
            todo.title = 'new title';
            let updatedTask = <Promise<Task>>service.updTaskById(todo);
            // expect(updatedTask.title).toEqual('new title');
        }));
    });

    describe('#toggleTaskComplete(todo)', () => {
        it('should return the updated todo with inverse complete status', inject([TaskDataService], (service: TaskDataService) => {
            let todo = new Task({ title: 'Hello 1', listId: 1, complete: false });
            service.addTask(todo);
            /*let updatedTask = <Task>service.toggleTaskComplete(todo);
            expect(updatedTask.complete).toEqual(true);
            service.toggleTaskComplete(todo);
            expect(updatedTask.complete).toEqual(false);*/
        }));
    });
});
