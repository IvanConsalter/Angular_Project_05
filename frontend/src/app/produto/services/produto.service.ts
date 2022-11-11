import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  buscarPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.urlService}/produtos/${id}`, super.ObterAuthHeaderJson())
      .pipe(
        catchError(super.serviceError)
      );
  }

  consultarProdutos(): Observable<Array<Produto>> {
    return this.http.get<Array<Produto>>(`${this.urlService}/produtos`, super.ObterAuthHeaderJson())
      .pipe(
        catchError(super.serviceError)
      );
  }

}
