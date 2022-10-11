import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorRoutingModule } from './fornecedor.route';
import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    ListaFornecedorComponent
  ],
  imports: [
    CommonModule,

    FornecedorRoutingModule,

    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TableModule
  ]
})
export class FornecedorModule { }
