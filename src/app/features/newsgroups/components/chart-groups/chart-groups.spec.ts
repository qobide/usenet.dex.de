import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGroups } from './chart-groups';

describe('ChartGroups', () => {
  let component: ChartGroups;
  let fixture: ComponentFixture<ChartGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGroups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartGroups, {
      bindings: [ inputBinding('months', () => []), inputBinding('years', () => []) ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
