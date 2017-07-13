import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateUserRoutingModule } from './createUser-routing.module';

import { CreateUserComponent } from './createUser.component';

@NgModule({
  imports: [
    CommonModule,
    CreateUserRoutingModule,
    FormsModule,
  ],
  declarations: [CreateUserComponent]
})
export class CreateUserModule { }
