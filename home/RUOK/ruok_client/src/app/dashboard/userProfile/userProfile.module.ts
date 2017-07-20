import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableModule } from "angular2-datatable";

import { UserProfileComponent } from './userProfile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DataTableModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
