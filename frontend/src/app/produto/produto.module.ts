import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoRoutingModule } from './produto.route';
import { ListaProdutoComponent } from './lista-produto/lista-produto.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProdutoGuard } from './guards/produto.guard';
import { FormProdutoComponent } from './form-produto/form-produto.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    ListaProdutoComponent,
    FormProdutoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ProdutoRoutingModule,

    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    CheckboxModule
  ],
  providers: [
    ProdutoGuard
  ]
})
export class ProdutoModule { }
