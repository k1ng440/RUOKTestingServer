/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactProviderComponent } from './contactProvider.component';

describe('ContactProviderComponent', () => {
  let component: ContactProviderComponent;
  let fixture: ComponentFixture<ContactProviderComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactProviderComponent ]
    });
   // .compileComponents(); <- not required for webpack
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProviderComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the page header containing 'SB Admin'`, () => {
    expect(debugEl.query(By.css('h1')).nativeElement.textContent).toContain('SB Admin');

  });

});
