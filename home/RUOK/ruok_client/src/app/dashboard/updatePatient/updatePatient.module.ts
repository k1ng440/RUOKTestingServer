import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'ng2-datepicker';
import { UpdatePatientComponent } from './updatePatient.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DatePickerModule,
    FormsModule
  ],
  declarations: [
  UpdatePatientComponent
  ]
})
export class UpdatePatientModule {
}

