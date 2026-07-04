import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { NewsgroupGuard } from './newsgroup-guard';

describe('newsgroupGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => NewsgroupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
