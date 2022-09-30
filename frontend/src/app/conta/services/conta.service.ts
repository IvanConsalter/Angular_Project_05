import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { Usuario } from './../models/usuario.model'

import { BaseService } from 'src/app/shared/services/base.service'

@Injectable({
	providedIn: 'root',
})
export class ContaService extends BaseService {
	constructor(private http: HttpClient) {
		super()
	}

	registarUsuario(usuario: Usuario): Observable<Usuario> {
		return this.http
			.post<Usuario>(
				`${this.urlService}/nova-conta`,
				usuario,
				this.obterHeaderJson()
			)
			.pipe(map(this.extractData), catchError(this.serviceError))
	}

	login(usuario: Usuario): Observable<Usuario> {
		return this.http
			.post<Usuario>(
				`${this.urlService}/entrar`,
				usuario,
				this.obterHeaderJson()
			)
			.pipe(map(this.extractData), catchError(this.serviceError))
	}
}
