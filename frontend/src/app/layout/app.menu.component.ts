import { OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { LayoutService } from './service/app.layout.service'

@Component({
	selector: 'app-menu',
	templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
	model: any[] = []

	constructor(public layoutService: LayoutService) {}

	ngOnInit() {
		this.model = [
			{
				items: [
					{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
				],
			},
			{
				items: [
					{ label: 'Fornecedores', icon: 'pi pi-fw pi-building', routerLink: ['/fornecedores'] },
				],
			},
			{
				items: [
					{ label: 'Produtos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/produtos'] },
				],
			},
		]
	}
}
