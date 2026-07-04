import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { RankingItem } from './ranking-item';

describe('RankingItem', () => {
  let component: RankingItem;
  let fixture: ComponentFixture<RankingItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingItem,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingItem);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('rankingItem', {
      'name' : 'de.testing',
      'rank' : 23,
      'last' : 42,
      'gain' : 19,
      'up'   : 19,
      'postings' : 999,
      'share' : 0.0037
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
