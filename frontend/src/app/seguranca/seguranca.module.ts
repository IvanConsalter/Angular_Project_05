import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountGuard } from './account.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AccountGuard]
})
export class SegurancaModule { }
