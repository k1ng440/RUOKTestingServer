import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EqualTextValidator } from "angular2-text-equality-validator"

import { ResetPasswordRoutingModule } from './resetPassword-routing.module';

import { ResetPasswordComponent } from './resetPassword.component';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule
  ],
  declarations: [
    ResetPasswordComponent,
    EqualTextValidator
  ]
})
export class ResetPasswordModule { }
