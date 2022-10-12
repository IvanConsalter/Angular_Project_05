import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FornecedorRoutingModule } from './fornecedor.route';

import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';
import { FormFornecedorComponent } from './form-fornecedor/form-fornecedor.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ListaFornecedorComponent,
    FormFornecedorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FornecedorRoutingModule,

    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    RadioButtonModule,
    CheckboxModule,
    DropdownModule
  ]
})
export class FornecedorModule { }
