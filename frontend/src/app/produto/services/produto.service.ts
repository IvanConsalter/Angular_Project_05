import { catchError, map } from 'rxjs/operators';
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

  novoProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.urlService}/produtos`, produto, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

}
