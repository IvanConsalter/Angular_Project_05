import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FornecedorRoutingModule } from './fornecedor.route';

import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';
import { FormFornecedorComponent } from './form-fornecedor/form-fornecedor.component';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FornecedorGuard } from './guards/fornecedor.guard';

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

    NgBrazil,
    TextMaskModule,

    ToolbarModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    RadioButtonModule,
    CheckboxModule,
    DropdownModule,
    DialogModule
  ],
  providers: [
    FornecedorGuard
  ]

})
export class FornecedorModule { }
