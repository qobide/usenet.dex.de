import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { RankingList } from './ranking-list';

describe('RankingList', () => {
  let component: RankingList;
  let fixture: ComponentFixture<RankingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingList,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingList);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('rankingList', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
