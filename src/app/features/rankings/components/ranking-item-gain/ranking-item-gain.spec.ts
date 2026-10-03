import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { RankingItemGain } from './ranking-item-gain';

describe('RankingItemGain', () => {
  let component: RankingItemGain;
  let fixture: ComponentFixture<RankingItemGain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingItemGain,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingItemGain);
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
