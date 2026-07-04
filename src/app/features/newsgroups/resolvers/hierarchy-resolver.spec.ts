import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { HierarchyInfo } from '../models/hierarchy-info';

import { hierarchyResolver } from './hierarchy-resolver';

describe('hierarchyResolver', () => {
  const executeResolver: ResolveFn<HierarchyInfo> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => hierarchyResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
