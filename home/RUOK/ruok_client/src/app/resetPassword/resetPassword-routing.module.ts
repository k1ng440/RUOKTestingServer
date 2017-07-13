import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordComponent } from './resetPassword.component';

const loginRoutes: Routes = [
    { path: 'resetPassword/:token', component: ResetPasswordComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]

})
export class ResetPasswordRoutingModule { }
