import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();

    /**
     * CONSTRUCTOR
     */
    constructor() { }

    /**
     * Método responsável por definir dado
     * @param data: any
     */
    public setNotify(data: any) {
        this.notify.next(data);
    }
}
