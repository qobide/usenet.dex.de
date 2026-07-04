import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { RankingItemInfo } from '../models/ranking-item-info';

import { rankingYearResolver } from './ranking-year-resolver';

describe('rankingYearResolver', () => {
  const executeResolver: ResolveFn<RankingItemInfo[]> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => rankingYearResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
