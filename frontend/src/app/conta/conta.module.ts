import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { ContaGuard } from './conta.guard'
import { ContaRoutingModule } from './conta.route'

import { ContaAppComponent } from './conta.app.component'
import { CadastroComponent } from './cadastro/cadastro.component'
import { LoginComponent } from './login/login.component'

import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'

@NgModule({
	declarations: [ContaAppComponent, CadastroComponent, LoginComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,

		ContaRoutingModule,

		InputTextModule,
		ButtonModule,
	],
	providers: [ContaGuard]
})
export class ContaModule {}
