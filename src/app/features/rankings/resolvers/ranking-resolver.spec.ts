import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { RankingsInfo } from '../models/rankings-info';

import { rankingResolver } from './ranking-resolver';

describe('rankingResolver', () => {
  const executeResolver: ResolveFn<RankingsInfo> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => rankingResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
