import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const produtoRouterConfig: Routes = [

];

@NgModule({
  imports: [
    RouterModule.forChild(produtoRouterConfig)
  ],
  exports: [RouterModule],
})

export class ProdutoRoutingModule { }
