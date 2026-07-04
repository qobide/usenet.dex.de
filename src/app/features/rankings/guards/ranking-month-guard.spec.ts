import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { RankingMonthGuard } from './ranking-month-guard';

describe('canMatchRankingMonthGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => RankingMonthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
