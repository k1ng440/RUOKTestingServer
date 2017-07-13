import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientViewRoutingModule } from './clientView-routing.module';
import { ClientViewComponent } from './clientView.component';

@NgModule({
  imports: [
    CommonModule,
    ClientViewRoutingModule,
    FormsModule
  ],
  declarations: [
    ClientViewComponent,
  ]
})
export class ClientViewModule { }
