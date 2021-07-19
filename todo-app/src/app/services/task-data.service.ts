import { Injectable } from '@angular/core';
import { Task } from './../models/task';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class TaskDataService {

    constructor(private apiService: ApiService) { }

    /**
     * Método responsável por retornar todas tasks de acordo com a lista
     * @param listId: number
     * @returns Lista de tasks
     */
    async getAllTasks(listId: number): Promise<Task[]> {
        return (await this.apiService.getAllTasksByListId(listId)).toPromise();
    }

    /**
     * Método responsável por buscar task por id
     * @param id: number
     * @returns Retorna uma task
     */
    async getTaskById(id: number): Promise<Task> {
        return (await this.apiService.getTaskById(id))
            .toPromise()
            .then(response => {
                return new Task(response);
            });
    }

    /**
     * Método responsável por adicionar uma task
     * @param task: Task
     * @returns
     */
    async addTask(task: Task) {
        return (await this.apiService.addTask(task)).toPromise();
    }

    /**
     * Método responsável por atualizar um task
     * @param task: Task
     * @returns
     */
    async updTaskById(task: Task): Promise<Task> {
        return (await this.apiService.updTask(task))
            .toPromise()
            .then(response => {
                return new Task(response);
            });
    }

    /**
     * Método responsável por remover o task
     * @param id
     * @param values
     * @returns
     */
    async delTaskById(id: number) {
        return (await this.apiService.delTask(id)).toPromise();
    }

    /**
     * Método responsável por "ocultar" o task quando completado
     * @param task: Task
     * @returns
     */
    async toggleTaskComplete(task: Task): Promise<Task> {
        task.complete = !task.complete;
        return await this.updTaskById(task);
    }
}
