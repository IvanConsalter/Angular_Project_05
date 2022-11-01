import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Fornecedor } from '../models/fornecedor.model';
import { CepConsulta } from '../models/cep-consulta.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends BaseService {

  fornecedor: Fornecedor = new Fornecedor();

  constructor(private http: HttpClient) {
    super ()
  }

  obterTodos(): Observable<Array<Fornecedor>> {
    return this.http
      .get<Array<Fornecedor>>(`${this.urlService}/fornecedores`)
      .pipe(catchError(super.serviceError));
  }

  buscarPorId(id: string) {
    return this.http.get<Fornecedor>(`${this.urlService}/fornecedores/${id}`, this.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.urlService}/fornecedores`, fornecedor, this.ObterAuthHeaderJson())
        .pipe(
          map(super.extractData),
          catchError(super.serviceError)
        )
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.urlService}/fornecedores/${fornecedor.id}`, fornecedor, this.ObterAuthHeaderJson())
        .pipe(
          map(super.extractData),
          catchError(super.serviceError)
        )
  }

  atualizarEndereco(fornecedor: Fornecedor): Observable<any> {
    return this.http.put<any>(
      `${this.urlService}/fornecedores/endereco/${fornecedor.endereco.id}`,
      fornecedor.endereco,
        this.ObterAuthHeaderJson())
          .pipe(
            map(super.extractData),
            catchError(super.serviceError)
          )
  }

  excluirFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(
      `${this.urlService}/fornecedores/${fornecedor.id}`,
      this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http.get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json`)
      .pipe(catchError(super.serviceError));
  }

}
