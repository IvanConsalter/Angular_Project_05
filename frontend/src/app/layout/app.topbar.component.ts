import { Component, ElementRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { LocalStorage } from '../shared/utils/localstorage'
import { LayoutService } from './service/app.layout.service'

@Component({
	selector: 'app-topbar',
	templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
	items!: MenuItem[]
	localStorage = new LocalStorage();

	@ViewChild('menubutton') menuButton!: ElementRef

	@ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

	@ViewChild('topbarmenu') menu!: ElementRef

	usuarioLogado: string;

	constructor(
		public layoutService: LayoutService,
		private router: Router
	) {
		this.usuarioLogado = this.localStorage.obterUsuario().email;
	}

	logout(): void {
		this.localStorage.limparDadosLocaisUsuario();
		this.router.navigate(['']);
	}

}
