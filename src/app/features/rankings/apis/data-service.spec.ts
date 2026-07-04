import { TestBed } from '@angular/core/testing';

import { RankingApiDataService } from './data-service';

describe('RankingApiDataService', () => {
  let service: RankingApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
