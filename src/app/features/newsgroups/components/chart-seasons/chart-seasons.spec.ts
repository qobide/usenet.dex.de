import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSeasons } from './chart-seasons';

describe('ChartSeasons', () => {
  let component: ChartSeasons;
  let fixture: ComponentFixture<ChartSeasons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSeasons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSeasons, {
      bindings: [ inputBinding('months', () => []) ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
