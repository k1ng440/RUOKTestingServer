/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompleteTextComponent } from './completeText.component';

describe('CompleteTextComponent', () => {
  let component: CompleteTextComponent;
  let fixture: ComponentFixture<CompleteTextComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteTextComponent ]
    });
   // .compileComponents(); <- not required for webpack
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTextComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the page header 'Tables'`, () => {
    expect(debugEl.query(By.css('.page-header')).nativeElement.textContent).toContain('Tables');

  });

});

