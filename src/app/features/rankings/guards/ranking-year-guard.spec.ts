import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { RankingYearGuard } from './ranking-year-guard';

describe('rankingYearGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => RankingYearGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
