import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { AppLayoutComponent } from './layout/app.layout.component'
import { AcessoNegadoComponent } from './core/acesso-negado/acesso-negado.component'

@NgModule({
	imports: [
		RouterModule.forRoot(
			[
				{
					path: '',
					loadChildren: () =>
						import('./conta/conta.module').then((m) => m.ContaModule),
				},
				{
					path: '',
					component: AppLayoutComponent,
					children: [
						{
							path: 'dashboard',
							loadChildren: () =>
								import('./demo/components/dashboard/dashboard.module').then(
									(m) => m.DashboardModule
								),
						},
						{
							path: 'fornecedores',
							loadChildren: () =>
								import('./fornecedor/fornecedor.module').then(
									(m) => m.FornecedorModule
								),
						},
					],
				},
				{
					path: 'acesso-negado',
					component: AcessoNegadoComponent
				},
			],
			{
				scrollPositionRestoration: 'enabled',
				anchorScrolling: 'enabled',
				onSameUrlNavigation: 'reload',
			}
		),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
