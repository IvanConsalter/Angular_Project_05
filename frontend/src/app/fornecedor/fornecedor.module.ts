import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorRoutingModule } from './fornecedor.route';
import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';

@NgModule({
  declarations: [
    ListaFornecedorComponent
  ],
  imports: [
    CommonModule,

    FornecedorRoutingModule
  ]
})
export class FornecedorModule { }
