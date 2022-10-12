import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormFornecedorComponent } from './form-fornecedor/form-fornecedor.component';
import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';

const fornecedorRouterConfig: Routes = [
	{
		path: '',
		component: ListaFornecedorComponent,
	},
	{
		path: 'novo',
		component: FormFornecedorComponent
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(fornecedorRouterConfig)
  ],
  exports: [RouterModule]
})

export class FornecedorRoutingModule { }
