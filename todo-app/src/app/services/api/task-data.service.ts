import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Task } from './../../models/task';
import { HelperService } from './../helper.service';

@Injectable({
    providedIn: 'root'
})
export class TaskDataService {

    /**
     * CONSTRUCTOR
     * @param httpClient: HttpClient
     * @param helperService: HelperService
     */
    constructor(
        private httpClient: HttpClient,
        private helperService: HelperService
    ) { }

    /**
     * Método responsável por retornar todas tasks de acordo com a lista
     * @param listId: number
     * @returns Lista de tasks
     */
    async getAllTasks(listId: number): Promise<Task[]> {
        return await this.httpClient.get<Task[]>(
            `${environment.apiURL}tasks?listId=${listId}`,
            { headers: this.helperService.headers }
        )
        .pipe(
            retry(1),
            catchError(this.helperService.handlerError)
        )
        .toPromise();
    }

    /**
     * Método responsável por buscar task por id
     * @param id: number
     * @returns Retorna uma task
     */
    async getTaskById(id: number): Promise<Task> {
        return this.httpClient.get<Task>(
            `${environment.apiURL}tasks/${id}`,
            { headers: this.helperService.headers }
        )
        .pipe(
            retry(1),
            catchError(this.helperService.handlerError)
        )
        .toPromise();
    }

    /**
     *
     * @param task: Task
     * @returns
     */
    async addTask(task: Task): Promise<Task> {
        return await this.httpClient.post<Task>(
            `${environment.apiURL}tasks`,
            JSON.stringify(task),
            { headers: this.helperService.headers }
        )
        .pipe(
            retry(1),
            catchError(this.helperService.handlerError)
        )
        .toPromise();
    }

    /**
     *
     * @param task: Task
     * @returns
     */
    async updateTask(task: Task): Promise<Task> {
        return await this.httpClient.put<Task>(
            `${environment.apiURL}tasks/${task.id}`,
            JSON.stringify(task),
            { headers: this.helperService.headers }
        )
        .pipe(
            retry(1),
            catchError(this.helperService.handlerError)
        )
        .toPromise();
    }

    /**
     *
     * @param id: number
     * @returns
     */
    async deleteTask(id: number) {
        return await this.httpClient.delete(
            `${environment.apiURL}tasks/${id}`,
            { headers: this.helperService.headers }
        )
        .pipe(
            retry(1),
            catchError(this.helperService.handlerError)
        )
        .toPromise();
    }

    /**
     * Método responsável por "ocultar" o task quando completado
     * @param task: Task
     * @returns
     */
    async toggleTaskComplete(task: Task): Promise<Task> {
        task.complete = !task.complete;
        return await this.updateTask(task);
    }
}
