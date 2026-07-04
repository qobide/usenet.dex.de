import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { homeResolver } from './home-resolver';

import { HomeInfo } from '../models/home-info';

describe('homeResolver', () => {
  const executeResolver: ResolveFn<HomeInfo> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => homeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
