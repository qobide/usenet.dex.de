import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGainLoss } from './chart-gain-loss';

describe('ChartGainLoss', () => {
  let component: ChartGainLoss;
  let fixture: ComponentFixture<ChartGainLoss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGainLoss]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartGainLoss, {
      bindings: [ inputBinding('months', () => []), inputBinding('years', () => []) ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
