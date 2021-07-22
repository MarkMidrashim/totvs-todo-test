import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HelperService } from '../helper.service';
import { List } from '../../models/list';

@Injectable({
    providedIn: 'root'
})
export class ListDataService {

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
     * Método responsável por retornar todas lists
     * @returns Lista de tasks
     */
    async getAllLists(): Promise<List[]> {
        return await this.httpClient.get<List[]>(
            `${environment.apiURL}lists`,
            { headers: this.helperService.headers }
        )
        .pipe(
            retry(1),
            catchError(this.helperService.handlerError)
        )
        .toPromise();
    }

    /**
     * Método responsável por buscar list por id
     * @param id: number
     * @returns Retorna uma list
     */
    async getListById(id: number): Promise<List> {
        return this.httpClient.get<List>(
            `${environment.apiURL}lists/${id}`,
            { headers: this.helperService.headers }
        )
        .pipe(
            retry(1),
            catchError(this.helperService.handlerError)
        )
        .toPromise();
    }

    /**
     * Método responsável por adicionar um list
     * @param list: List
     * @returns
     */
    async addList(list: List): Promise<List> {
        return await this.httpClient.post<List>(
            `${environment.apiURL}lists`,
            JSON.stringify(list),
            { headers: this.helperService.headers }
        )
        .pipe(
            retry(1),
            catchError(this.helperService.handlerError)
        )
        .toPromise();
    }
}
