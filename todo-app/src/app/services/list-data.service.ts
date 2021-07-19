import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ListDataService {

    constructor(private apiService: ApiService) { }

    /**
     * Método responsável por retornar todas lists
     * @returns Lista de tasks
     */
    async getAllLists(): Promise<List[]> {
        return (await this.apiService.getAllLists()).toPromise();
    }
}
