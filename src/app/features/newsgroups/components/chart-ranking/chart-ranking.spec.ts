import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRanking } from './chart-ranking';

describe('ChartRanking', () => {
  let component: ChartRanking;
  let fixture: ComponentFixture<ChartRanking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartRanking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartRanking, {
      bindings: [ inputBinding('months', () => []), inputBinding('years', () => []) ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
