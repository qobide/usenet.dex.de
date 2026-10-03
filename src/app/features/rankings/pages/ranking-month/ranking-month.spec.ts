import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockActivatedRoute } from '../../../../core/mocks/activated-route';
import { provideMockDataConfig }     from '../../../../shared/mocks/data-config';

import { RankingMonth } from './ranking-month';

describe('RankingMonth', () => {
  let component: RankingMonth;
  let fixture: ComponentFixture<RankingMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingMonth],
      providers: [ provideMockDataConfig(), provideMockActivatedRoute({
        data : { ranking : [] },
        params : { year : 1999, month : 9 }
      })]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingMonth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.month).toBe(9);
  });

});
