/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GasComponent } from './gas.component';

describe('GasComponent', () => {
  let component: GasComponent;
  let fixture: ComponentFixture<GasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
