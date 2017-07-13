import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap/alert';
import { DataTableModule } from "angular2-datatable";
import { PendingTextComponent } from './pendingText.component';


@NgModule({
    imports: [
        CommonModule,
        AlertModule.forRoot(),
        RouterModule,
        DataTableModule
    ],
    declarations: [
        PendingTextComponent,
    ],
    exports: [
        PendingTextComponent,
    ]
})

export class PendingTextModule { }
