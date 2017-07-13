import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableModule } from "angular2-datatable";

import { CompleteTextComponent } from './completeText.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DataTableModule
  ],
  declarations: [CompleteTextComponent]
})
export class CompleteTextModule { }
