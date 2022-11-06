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

  consultarProdutos(): Observable<Array<Produto>> {
    return this.http.get<Array<Produto>>(`http://localhost:5001/api/v1/produtos`, super.ObterAuthHeaderJson())
      .pipe(
        catchError(super.serviceError)
      );
  }

}
