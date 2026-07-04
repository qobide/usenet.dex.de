import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { NewsgroupInfo } from '../models/newsgroup-info';

import { newsgroupResolver } from './newsgroup-resolver';

describe('newsgroupResolver', () => {
  const executeResolver: ResolveFn<NewsgroupInfo> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => newsgroupResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
