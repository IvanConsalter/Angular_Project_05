import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { AppLayoutComponent } from './layout/app.layout.component'

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
					],
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
