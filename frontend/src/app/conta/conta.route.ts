import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CadastroComponent } from './cadastro/cadastro.component'
import { LoginComponent } from './login/login.component'
import { ContaGuard } from './conta.guard'
import { HomeComponent } from './home/home.component'

const contaRouterConfig: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [ContaGuard],
		children: [
			{
				path: 'cadastro',
				component: CadastroComponent,
				canDeactivate: [ContaGuard],
				canActivate: [ContaGuard]
			},
			{
				path: 'login',
				component: LoginComponent,
				canActivate: [ContaGuard]
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(contaRouterConfig)],
	exports: [RouterModule],
})
export class ContaRoutingModule {}
