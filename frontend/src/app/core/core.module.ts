import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AcessoNegadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
