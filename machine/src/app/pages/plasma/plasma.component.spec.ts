/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlasmaComponent } from './plasma.component';

describe('PlasmaComponent', () => {
  let component: PlasmaComponent;
  let fixture: ComponentFixture<PlasmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlasmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
