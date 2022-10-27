import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormFornecedorComponent } from './form-fornecedor/form-fornecedor.component';
import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';
import { FornecedorResolver } from './resolver/fornecedor.resolver';

const fornecedorRouterConfig: Routes = [
	{
		path: '',
		component: ListaFornecedorComponent,
	},
	{
		path: 'novo',
		component: FormFornecedorComponent
	},
	{
		path: 'editar/:idFornecedor',
		component: FormFornecedorComponent,
		resolve: {
			fornecedor: FornecedorResolver
		}
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(fornecedorRouterConfig)
  ],
  exports: [RouterModule],
	providers: [FornecedorResolver]
})

export class FornecedorRoutingModule { }
