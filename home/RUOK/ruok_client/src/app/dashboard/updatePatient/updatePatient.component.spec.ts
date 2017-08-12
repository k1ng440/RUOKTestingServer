/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdatePatientComponent } from './updatePatient.component';

describe('UpdatePatientComponent', () => {
  let component: UpdatePatientComponent;
  let fixture: ComponentFixture<UpdatePatientComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePatientComponent]
    });
    // .compileComponents(); <- not required for webpack
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatientComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the page header 'Forms'`, () => {
    expect(debugEl.query(By.css('.page-header')).nativeElement.textContent).toContain('Forms');

  });

});
