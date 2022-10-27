import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedorResolver implements Resolve<Fornecedor> {

  constructor(
    private fornecedorService: FornecedorService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fornecedor> {
    return this.fornecedorService.buscarPorId(route.params['idFornecedor']);
  }
}
