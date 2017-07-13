import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './forgotPassword.component';

const loginRoutes: Routes = [
    { path: 'forgotPassword', component: ForgotPasswordComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]

})
export class ForgotPasswordRoutingModule { }
