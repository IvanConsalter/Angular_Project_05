import { Injectable } from '@angular/core'
import {
	Router,
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service'

@Injectable({
	providedIn: 'root',
})
export class ProdutoResolver implements Resolve<Produto> {

  constructor(
    private produtoService: ProdutoService
  ) { }
	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Produto> {
		return this.produtoService.buscarPorId(route.params['idProduto']);
	}
}
