import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoRoutingModule } from './produto.route';
import { ListaProdutoComponent } from './lista-produto/lista-produto.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProdutoGuard } from './guards/produto.guard';



@NgModule({
  declarations: [
    ListaProdutoComponent
  ],
  imports: [
    CommonModule,

    ProdutoRoutingModule,

    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TableModule
  ],
  providers: [
    ProdutoGuard
  ]
})
export class ProdutoModule { }
