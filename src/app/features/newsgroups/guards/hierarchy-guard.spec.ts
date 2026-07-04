import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { HierarchyGuard } from './hierarchy-guard';

describe('hierarchyGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => HierarchyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
