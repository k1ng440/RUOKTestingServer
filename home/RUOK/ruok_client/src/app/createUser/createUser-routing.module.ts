import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './createUser.component';

const createUserRoutes: Routes = [
    { path: 'createUser', component: CreateUserComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(createUserRoutes)
    ],
    exports: [
        RouterModule
    ]

})
export class CreateUserRoutingModule { }
