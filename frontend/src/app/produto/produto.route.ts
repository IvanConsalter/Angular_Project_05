import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoGuard } from "./guards/produto.guard";
import { ListaProdutoComponent } from "./lista-produto/lista-produto.component";

const produtoRouterConfig: Routes = [
  {
    path: '',
    component: ListaProdutoComponent,
    canActivate: [ProdutoGuard],
		data: [{ claim: { nome: 'Produto', value: 'Excluir'} }]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(produtoRouterConfig)
  ],
  exports: [RouterModule],
})

export class ProdutoRoutingModule { }
