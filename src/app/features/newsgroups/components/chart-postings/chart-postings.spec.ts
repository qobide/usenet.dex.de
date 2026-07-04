import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPostings } from './chart-postings';

describe('ChartPostings', () => {
  let component: ChartPostings;
  let fixture: ComponentFixture<ChartPostings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartPostings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPostings, {
      bindings: [ inputBinding('months', () => []) ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
