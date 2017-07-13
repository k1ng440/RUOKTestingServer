import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgotPassword/forgotPassword.module';
import { CreateUserModule } from './createUser/createUser.module';
import { ResetPasswordModule } from './resetPassword/resetPassword.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientViewModule } from './clientView/clientView.module';
import { ContactProviderModule } from './contactProvider/contactProvider.module';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule,
        LoginModule,
        ForgotPasswordModule,
        CreateUserModule,
        ResetPasswordModule,
        DashboardModule,
        ClientViewModule,
        ContactProviderModule
    ]
})
export class AppRoutingModule { }
