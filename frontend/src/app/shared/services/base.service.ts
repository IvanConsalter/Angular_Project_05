import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { throwError } from 'rxjs';

import { environment } from './../../../environments/environment';

export abstract class BaseService {

    protected urlService: string = environment.apiUrl;

    protected obterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: Array<string> = [];

        if(response instanceof HttpErrorResponse) {
            if(response.statusText === 'Unknown Error') {
                customError.push('Ocorreu um erro desconhecido');
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(() => new Error(response));
    }
}
