import { TestBed } from '@angular/core/testing';

import { CoreApiDataService } from './data-service';

describe('CoreApiDataService', () => {
  let service: CoreApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
