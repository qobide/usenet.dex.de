import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { RankingYear } from './ranking-year';

describe('RankingYear', () => {
  let component: RankingYear;
  let fixture: ComponentFixture<RankingYear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingYear, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingYear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
