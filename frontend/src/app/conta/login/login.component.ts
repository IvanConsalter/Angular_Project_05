import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
	usuario: Usuario

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
		private contaService: ContaService
  ) { }

  ngOnInit(): void {
    this.configurarLoginForm();
  }

  configurarLoginForm(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		})
	}

  login() {
		if (this.loginForm.dirty && this.loginForm.valid) {
			this.usuario = Object.assign({}, this.usuario, this.loginForm.value)

			this.contaService.login(this.usuario).subscribe(
				(resposta) => {
					this.processarSucesso(resposta)
				},
				(error) => console.log(error)
			)
		}
	}

  processarSucesso(resposta: any): void {
		this.loginForm.reset()
    console.log('Sucesso', resposta);
		this.contaService.LocalStorage.salvarDadosLocaisUsuario(resposta);
		this.router.navigate(['dashboard']);
	}

}
