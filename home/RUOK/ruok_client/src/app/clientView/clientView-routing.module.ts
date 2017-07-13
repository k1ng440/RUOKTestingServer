import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientViewComponent } from './clientView.component';

const loginRoutes: Routes = [
    { path: 'clientView/:token', component: ClientViewComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]

})
export class ClientViewRoutingModule { }
