import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormFornecedorComponent } from './form-fornecedor/form-fornecedor.component';
import { FornecedorGuard } from './guards/fornecedor.guard';
import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';
import { FornecedorResolver } from './resolver/fornecedor.resolver';

const fornecedorRouterConfig: Routes = [
	{
		path: '',
		component: ListaFornecedorComponent,
		canActivate: [FornecedorGuard],
		data: [{ claim: { nome: 'Fornecedor', value: 'Excluir'} }]
	},
	{
		path: 'novo',
		component: FormFornecedorComponent,
		canDeactivate: [FornecedorGuard],
		canActivate: [FornecedorGuard],
		data: [{ claim: { nome: 'Fornecedor', value: 'Adicionar'} }]
	},
	{
		path: 'editar/:idFornecedor',
		component: FormFornecedorComponent,
		resolve: {
			fornecedor: FornecedorResolver
		},
		canDeactivate: [FornecedorGuard],
		canActivate: [FornecedorGuard],
		data: [{ claim: { nome: 'Fornecedor', value: 'Atualizar'} }]
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
