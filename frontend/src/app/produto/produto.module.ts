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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    ListaProdutoComponent,
    FormProdutoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ProdutoRoutingModule,

    ImageCropperModule,

    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    CheckboxModule,
    DialogModule
  ],
  providers: [
    ProdutoGuard
  ]
})
export class ProdutoModule { }
