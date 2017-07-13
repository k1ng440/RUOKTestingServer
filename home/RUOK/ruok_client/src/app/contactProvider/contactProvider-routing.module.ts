import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactProviderComponent } from './contactProvider.component';

const loginRoutes: Routes = [
    { path: 'contactProvider/:token', component: ContactProviderComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]

})
export class ContactProviderRoutingModule { }
