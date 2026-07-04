import { TestBed } from '@angular/core/testing';

import { DataConfigLoader } from './data-config-loader';

describe('DataConfigLoader', () => {
  let loader: DataConfigLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loader = TestBed.inject(DataConfigLoader);
  });

  it('should be created', () => {
    expect(loader).toBeTruthy();
  });
});
