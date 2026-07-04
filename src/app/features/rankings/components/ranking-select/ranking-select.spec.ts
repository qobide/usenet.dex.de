import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockActivatedRoute } from '../../../../core/mocks/activated-route';
import { provideMockDataConfig  }    from '../../../../shared/mocks/data-config';

import { RankingSelect } from './ranking-select';

describe('RankingSelect', () => {
  let component: RankingSelect;
  let fixture: ComponentFixture<RankingSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingSelect],
      providers: [ provideMockDataConfig(), provideMockActivatedRoute({}) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
