import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactProviderRoutingModule } from './contactProvider-routing.module';
import { ContactProviderComponent } from './contactProvider.component';

@NgModule({
  imports: [
    CommonModule,
    ContactProviderRoutingModule,
    FormsModule
  ],
  declarations: [
    ContactProviderComponent,
  ]
})
export class ContactProviderModule { }
