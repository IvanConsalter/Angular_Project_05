import { LocalStorage } from '../shared/utils/localstorage';
import { Injectable } from '@angular/core'
import {
	CanActivate,
  Router,
} from '@angular/router'

@Injectable()
export class AccountGuard
	implements CanActivate
{

  localStorage = new LocalStorage();

  constructor(private router: Router) {}

	canActivate() {
    if(!this.localStorage.obterTokenUsuario()) {
      this.router.navigate(['']);
    }

    return true;
  }
}
