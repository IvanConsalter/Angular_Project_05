import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from "@angular/router"
import { LocalStorage } from "src/app/shared/utils/localstorage"

@Injectable()
export class ProdutoGuard
	implements CanActivate
{
	localStorage = new LocalStorage()

	constructor(private router: Router) {}

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
