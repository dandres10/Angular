/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IceComponent } from './ice.component';

describe('IceComponent', () => {
  let component: IceComponent;
  let fixture: ComponentFixture<IceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
