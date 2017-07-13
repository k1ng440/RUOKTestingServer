/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap/alert';
import { RouterTestingModule } from '@angular/router/testing';

import { PendingTextComponent } from './home.component';


describe('PendingTextComponent', () => {
  let component: PendingTextComponent;
  let fixture: ComponentFixture<PendingTextComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule, AlertModule.forRoot() ],
      declarations: [ PendingTextComponent ],
      providers: []
    });
   // .compileComponents(); <- not required for webpack
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTextComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
