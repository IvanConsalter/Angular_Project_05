import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AccountGuard } from 'src/app/seguranca/account.guard'
import { DashboardComponent } from './dashboard.component'

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent,
				canActivate: [AccountGuard]
			}
		]),
	],
	exports: [RouterModule],
})
export class DashboardsRoutingModule {}
