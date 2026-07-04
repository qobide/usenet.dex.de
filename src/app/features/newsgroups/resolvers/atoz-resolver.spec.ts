import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { atozResolver } from './atoz-resolver';

import { AtoZItemInfo } from '../models/atoz-item-info';

describe('atozResolver', () => {
  const executeResolver: ResolveFn<AtoZItemInfo[]> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => atozResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
