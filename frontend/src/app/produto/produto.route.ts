import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormProdutoComponent } from "./form-produto/form-produto.component";
import { ProdutoGuard } from "./guards/produto.guard";
import { ListaProdutoComponent } from "./lista-produto/lista-produto.component";
import { ProdutoResolver } from "./resolver/produto.resolver";

const produtoRouterConfig: Routes = [
  {
    path: '',
    component: ListaProdutoComponent,
    canActivate: [ProdutoGuard],
		data: [{ claim: { nome: 'Produto', value: 'Excluir'} }]
  },
  {
		path: 'novo',
		component: FormProdutoComponent,
		canActivate: [ProdutoGuard],
		data: [{ claim: { nome: 'Produto', value: 'Adicionar'} }]
	},
  {
		path: 'editar/:idProduto',
		component: FormProdutoComponent,
    resolve: {
      produto: ProdutoResolver
    },
		canActivate: [ProdutoGuard],
		data: [{ claim: { nome: 'Produto', value: 'Atualizar'} }]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(produtoRouterConfig)
  ],
  exports: [RouterModule],
})

export class ProdutoRoutingModule { }
