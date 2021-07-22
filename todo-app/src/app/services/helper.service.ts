import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    public headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    private errorMessage = '';

    /**
     * CONSTRUCTOR
     */
    constructor() { }

    /**
     * Handler Error
     * @param error
     * @returns
     */
    handlerError(error: any) {
        if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
        } else {
            this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.log(this.errorMessage);
        return throwError(this.errorMessage);
    }
}
