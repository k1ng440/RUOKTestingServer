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



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
export class AppModule { }
