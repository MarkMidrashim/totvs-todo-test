import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Task } from '../models/task';
import { List } from '../models/list';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private SERVER_URL = "http://localhost:3000";

    /**
     * CONSTRUCTOR
     * @param httpClient
     */
    constructor(private httpClient: HttpClient) { }

    /**
     * Handler Error
     * @param error
     * @returns
     */
    handlerError(error: any) {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        window.alert(errorMessage);
        return throwError(errorMessage);
    }

    /**
     *
     * @returns
     */
    async getAllLists(): Promise<Observable<List[]>> {
        return await this.httpClient
            .get<List[]>(`${this.SERVER_URL}/lists`)
            .pipe(
                retry(1),
                catchError(this.handlerError)
            );
    }

    /**
     *
     * @param listId: number
     * @returns
     */
    async getAllTasksByListId(listId: number): Promise<Observable<Task[]>> {
        return await this.httpClient
            .get<Task[]>(`${this.SERVER_URL}/tasks?listId=${listId}`)
            .pipe(
                retry(1),
                catchError(this.handlerError)
            );
    }

    /**
     *
     * @param id: number
     * @returns
     */
    async getTaskById(id: number): Promise<Observable<Task>> {
        return this.httpClient
            .get<Task>(`${this.SERVER_URL}/tasks?id=${id}`)
            .pipe(
                retry(1),
                catchError(this.handlerError)
            );
    }

    /**
     *
     * @param task: Task
     * @returns
     */
    async addTask(task: Task) {
        return await this.httpClient
            .post(`${this.SERVER_URL}/tasks`, JSON.stringify(task))
            .pipe(
                retry(1),
                catchError(this.handlerError)
            );
    }

    /**
     *
     * @param task: Task
     * @returns
     */
    async updTask(task: Task) {
        return await this.httpClient
            .put(`${this.SERVER_URL}/tasks/?id=${task.id}`, JSON.stringify(task))
            .pipe(
                retry(1),
                catchError(this.handlerError)
            );
    }

    /**
     *
     * @param id: number
     * @returns
     */
    async delTask(id: number) {
        return await this.httpClient
            .delete(`${this.SERVER_URL}/tasks?id=${id}`)
            .pipe(
                retry(1),
                catchError(this.handlerError)
            );
    }
}
