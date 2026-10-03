import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { Rankings } from './rankings';
import { rankings } from '../../fixtures/rankings.fixtures';

describe('Rankings', () => {
  let component: Rankings;
  let fixture: ComponentFixture<Rankings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rankings, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rankings);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('rankings', rankings);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
