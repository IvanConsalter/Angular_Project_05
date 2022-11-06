import { FormFornecedorComponent } from './../form-fornecedor/form-fornecedor.component'
import { LocalStorage } from './../../shared/utils/localstorage'
import { Injectable } from '@angular/core'
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
	CanDeactivate,
} from '@angular/router'
import { Observable } from 'rxjs'

@Injectable()
export class FornecedorGuard
	implements CanActivate, CanDeactivate<FormFornecedorComponent>
{
	localStorage = new LocalStorage()

	constructor(private router: Router) {}

	canDeactivate(component: FormFornecedorComponent) {
		if (component.mudancasNaoSalvas) {
			return window.confirm(
				'Tem certeza que deseja abandonar o preenchimento do formulario?'
			)
		}
		return true
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!this.localStorage.obterTokenUsuario()) {
			this.router.navigate(['/login'])
		}

		let user = this.localStorage.obterUsuario()
		let claim: any = route.data[0]

		if (claim !== undefined) {
			let claim = route.data[0]['claim']

			if (claim) {
				if (!user.claims) {
					this.navegarAcessoNegado()
				}

				let userClaims = user.claims.find((x: any) => x.type === claim.nome)

				if (!userClaims) {
					this.navegarAcessoNegado()
				}

				let valoresClaim = userClaims.value as string

				if (!valoresClaim.includes(claim.value)) {
					this.navegarAcessoNegado()
				}
			}
		}

		return true
	}

	navegarAcessoNegado(): void {
		this.router.navigate(['acesso-negado'])
	}
}
