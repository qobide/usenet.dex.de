import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { RankingItemInfo } from '../models/ranking-item-info';

import { rankingMonthResolver } from './ranking-month-resolver';

describe('rankingMonthResolver', () => {
  const executeResolver: ResolveFn<RankingItemInfo[]> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => rankingMonthResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
