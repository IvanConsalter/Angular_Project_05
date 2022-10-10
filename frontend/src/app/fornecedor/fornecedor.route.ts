import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';

const fornecedorRouterConfig: Routes = [
	{
		path: '',
		component: ListaFornecedorComponent,
		children: [
		],
	},
];

@NgModule({
  imports: [
    RouterModule.forChild(fornecedorRouterConfig)
  ],
  exports: [RouterModule]
})

export class FornecedorRoutingModule { }
