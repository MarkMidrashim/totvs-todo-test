import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();

    constructor() { }

    public setNotify(data: any) {
        this.notify.next(data);
    }
}
