import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/***************Services*****************/
import { AuthenticationService } from './services/authentication.service';
import { PatientService } from './services/patient.service';

/*************Components*****************/
import { Globals } from './globals';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/************FX DatePicker**************/
import {DatepickerModule} from 'ng2-bootstrap/datepicker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DatepickerModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    PatientService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
