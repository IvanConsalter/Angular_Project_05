import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Usuario } from '../conta/models/usuario.model';

import { LocalStorage } from '../shared/utils/localstorage';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  token: string = '';
  usuario: Usuario;
  email: string = '';
  localStorage = new LocalStorage();

  constructor(private router: Router) {}

  usuarioLogado(): boolean {
    this.token = this.localStorage.obterTokenUsuario();
    this.usuario = this.localStorage.obterUsuario();

    if(this.usuario) {
      this.email = this.usuario.email;
    }

    if(this.token) {
      this.router.navigate(['']);
      return true;
    }
    else {
      this.router.navigate(['conta/login']);
      return false;
    }

  }

  logout(): void {
    this.localStorage.limparDadosLocaisUsuario();
    this.router.navigate(['conta/login']);
  }
}
