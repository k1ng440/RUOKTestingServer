import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { SidebarModule } from '../shared/sidebar/sidebar.module';
import { TopnavModule } from '../shared/topnav/topnav.module';
import { PendingTextModule } from './pendingText/pendingText.module';
import { CompleteTextModule } from './completeText/completeText.module';
import { AddPatientModule } from './addPatient/addPatient.module';
import { BsComponentModule } from './bs-components/bs-components.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarModule,
    TopnavModule,
    PendingTextModule,
    CompleteTextModule,
    AddPatientModule,
    BsComponentModule
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
