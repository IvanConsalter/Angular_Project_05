import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';

import { LocalStorage } from './../utils/localstorage';
import { environment } from './../../../environments/environment';

export abstract class BaseService {
	public LocalStorage = new LocalStorage();
	protected urlService: string = environment.apiUrl;

	protected obterHeaderJson() {
		return {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
	}

	protected ObterAuthHeaderJson() {
		return {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
			})
		};
}

	protected extractData(response: any) {
		return response.data || {};
	}

	protected serviceError(response: Response | any) {
		let customError: Array<string> = [];

		if (response instanceof HttpErrorResponse) {
			if (response.statusText === 'Unknown Error') {
				customError.push('Ocorreu um erro desconhecido');
				response.error.errors = customError;
			}
		}

		console.error(response);
		return throwError(() => new Error(response));
	}
}
