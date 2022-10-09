import { LocalStorage } from './../shared/utils/localstorage';
import { Injectable } from '@angular/core'
import {
	CanActivate,
	CanDeactivate,
  Router,
} from '@angular/router'
import { CadastroComponent } from './cadastro/cadastro.component'

@Injectable()
export class ContaGuard
	implements CanDeactivate<CadastroComponent>, CanActivate
{

  localStorage = new LocalStorage();

  constructor(private router: Router) {}

	canDeactivate(component: CadastroComponent) {
		if (component.mudancasNaoSalvas) {
			return window.confirm(
				'Exitem alterações feitas. Tem certeza que deseja abandonar as alterações realizadas?'
			)
		}

		return true
	}

	canActivate() {
    if(this.localStorage.obterTokenUsuario()) {
      this.router.navigate(['dashboard']);
    }

    return true;
  }
}
